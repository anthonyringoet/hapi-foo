var Joi = require('joi');
var Boom = require('boom');

exports.register = function(plugin, options, next) {

  // Setup plugin model
  require('./model')(plugin);

  plugin.views({
    engines: {
      html: 'handlebars'
    },
    path: './templates',
    partialsPath: './templates',
    layout: true,
    layoutPath: './../homepage/templates'
  });

  // coffeemaker routes
  plugin.route({
    method: 'GET',
    path: '/coffeemakers',
    config: {
      handler: function(request, reply){
        plugin.methods.getRandomCoffeemakers(function (err, coffeeMakers) {

          if (err) {
            return reply(Boom.notFound());
          }

          reply.view('list', {
            title: 'Coffeemakers',
            list: coffeeMakers,
            baseUrl: request.server.info.uri
          });

        });
      },
      validate: {
        query: {
          page: Joi.number().min(1)
        }
      }
    }
  });

  plugin.route({
    method: 'GET',
    path: '/coffeemakers/{id}',
    config: {
      handler: function(request, reply){

        plugin.methods.getCoffeemakerById(request.params.id, function (err, coffeemaker) {

          if (err) {
            return reply(Boom.notFound());
          }

          // reply(coffeemaker);

          reply.view('view', {
            title: coffeemaker ? coffeemaker.type : '',
            view: coffeemaker,
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
