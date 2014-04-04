var Joi = require('joi');
var Boom = require('boom');

// Setup plugin model
var model = require('./model');

exports.register = function(plugin, options, next) {

  plugin.views({
    engines: {
      html: 'handlebars'
    },
    path: './templates',
    partialsPath: './templates',
    layout: true,
    layoutPath: './../homepage/templates'
  });

  // coffee routes
  plugin.route({
    method: 'GET',
    path: '/coffee',
    config: {
      handler: function(request, reply){
        // reply(model.getCoffeeList());

        reply.view('list', {
          title: 'Coffee',
          list: model.getCoffeeList(),
          baseUrl: request.server.info.uri
        });
      },
      validate: {
        query: {
          page: Joi.number().min(1)
        }
      },
      cache: {expiresIn: 60 * 60 * 1000}
    }
  });

  plugin.route({
    method: 'GET',
    path: '/coffee/{id}',
    config: {
      handler: function(request, reply){

        model.getCoffeeById(request.params.id, function (err, coffee) {

          if (err) {
            return reply(Boom.notFound());
          }

          // reply(coffee);

          reply.view('view', {
            title: coffee ? coffee.type : '',
            view: coffee,
            baseUrl: request.server.info.uri
          });

        });

      },
      validate: {
        path: {
          id: Joi.number().min(1)
        }
      }
    }
  });

  next();
}
