module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2b4acd4bb58931d29d349cbf31715819'),
  },
});
