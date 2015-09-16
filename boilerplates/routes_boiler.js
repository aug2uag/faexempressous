// module.exports = function(express, passport) {
//   var router = express.Router();

//   router.all('/api/*',function(req, res, next) {
//     next();
//   }, passport.authenticate('bearer', {
//     session : false
//   }), function(req, res, next) {
//     next();
//   });

//   /* GET */
//   router.get('/test', function(req, res) {
//     res.json({success: "faexempressous 0.0.1"});
//   });
  
//   /* POST */
  
//   /* PUT */

//   /* DELETE */

//   return router;
// };
