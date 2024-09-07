const { optimizeRoute } = require("../services/aiRouteOptimizer");

const getOptimizedRoute = async (req, res) => {
  const currentRouteData = req.body.routeData;

  const optimizedRoute = optimizeRoute(currentRouteData);

  res.status(200).json({ optimizedRoute });
};
