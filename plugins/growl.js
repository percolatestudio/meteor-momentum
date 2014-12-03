Momentum.registerPlugin('growl', function(options) {
  options = _.extend({}, options, {
    duration: 500,
    easing: [ 250, 15 ], //spring physics
    // easing: [ 0.17, 0.67, 0.83, 0.67 ] //bezier curve
  });
  
  return {
    insertElement: function(node, next) {
      var $node = $(node);
      
      $node
        .insertBefore(next)
      
      var ball = Impulse($node)
        .style('scale', function(scale) {
          console.log(arguments);
          return scale
        });

      ball.spring({ tension: 200, damping: 10 })
        .from(.6)
        .to(1).start();
      
      //   .velocity({
      //     translateZ: 0,
      //     scale: [1, 0]
      //   }, {
      //     easing: options.easing,
      //     duration: options.duration,
      //     queue: false
      //   })
      //   .velocity("fadeIn", {
      //     duration: options.duration,
      //     queue: false
      //   });
      //
      // $(next).nextAll()
      //   .velocity({
      //     translateZ: 0,
      //     translateY: [-1 * $node.outerHeight()]
      //   }, {
      //     duration: 0,
      //     queue: false
      //   })
      //   .velocity({
      //     translateY: [0]
      //   }, {
      //     duration: options.duration - 100, //speed it up a little
      //     queue: false
      //   });
    },
    moveElement: function(node, next) {
      this.removeElement(node);
      this.insertElement(node, next);
    },
    removeElement: function(node) {
      var $node = $(node);
      
      // var ball = Impulse($node)
      // .style('opacity', function(scale) {
      //   console.log('foo:' + arguments);
      //   return scale
      // })
      //
      // ball.decelerate({ deceleration: 500 })
      //   .velocity(300, 300)
      //   .from(0, 0)
      //   .to(1000, 1000).start()
      
      // ball.spring({ tension: 200, damping: 10 })
      //   .from(1)
      //   .to(0).start().then(function() {
      //     console.log('finished');
      //     $node.remove();
      //   })
        
      $node.remove();
        
      
      // $node
      //   .velocity("fadeOut", {
      //     duration: options.duration,
      //     complete: function() {
      //       $node.remove();
      //     }
      //   });
    }
  }
});


// Momentum.registerPlugin('growl', function(options) {
//   options = _.extend({}, options, {
//     duration: 500,
//     easing: [ 250, 15 ], //spring physics
//     // easing: [ 0.17, 0.67, 0.83, 0.67 ] //bezier curve
//   });
//
//   return {
//     insertElement: function(node, next) {
//       var $node = $(node);
//
//       $node
//         .insertBefore(next)
//         .velocity({
//           translateZ: 0,
//           scale: [1, 0]
//         }, {
//           easing: options.easing,
//           duration: options.duration,
//           queue: false
//         })
//         .velocity("fadeIn", {
//           duration: options.duration,
//           queue: false
//         });
//
//       $(next).nextAll()
//         .velocity({
//           translateZ: 0,
//           translateY: [-1 * $node.outerHeight()]
//         }, {
//           duration: 0,
//           queue: false
//         })
//         .velocity({
//           translateY: [0]
//         }, {
//           duration: options.duration - 100, //speed it up a little
//           queue: false
//         });
//     },
//     moveElement: function(node, next) {
//       this.removeElement(node);
//       this.insertElement(node, next);
//     },
//     removeElement: function(node) {
//       var $node = $(node);
//
//       $node
//         .velocity("fadeOut", {
//           duration: options.duration,
//           complete: function() {
//             $node.remove();
//           }
//         });
//     }
//   }
// });
//
