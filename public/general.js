require('plugins/Skeleton/generalController')
require('plugins/Skeleton/general.css')


function GeneralProvider(Private) {
  var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));

// Include the Schemas class, which will be used to define schemas
var Schemas = Private(require('ui/Vis/Schemas'));


  return new TemplateVisType({
    name: 'GeneralPlugin', // The internal id of the visualization (must be unique)
    title: 'Plugin', // The title of the visualization, shown to the user
    description: 'Plugin description goes here', // The description of this vis
    icon: 'fa-cloud', // The font awesome icon of this visualization
    template: require('plugins/Skeleton/general.html'),
//define the aggregation your visualization accepts
    schemas: new Schemas([
      {
        group: 'metrics',
// group - either "metrics" or "buckets". Will define, which kind of aggregation you want to describe in this object.
        name: 'funsize',
//name - the name (id) of this aggregation. You can use this later to get a reference to the different aggregations again
        title: 'Funsize',
//title - the title shown to the user, when he adds the aggregation. Should describe how that aggregation will be visualized (e.g. in that case the bucket aggregation will create tags, the metrics aggregation will influence the tag size)
        min: 1,
        max: 1,
//min/max - the number of minimum and maximum aggregations of that type, a user can add. E.g. the vertical bar chart has a bucket aggregation for "Split Bars". It is not limited (i.e. no max value specified) since it can split the bar as many times as the user wishes. In our case we only allow 1 aggregation of each type, due to the way our visualization works.
        aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev']
//aggFilter - a filter on which aggregations should be allowed. It is an array of either aggregation types (see below), that are allowed in this place (as shown in our metrics aggregation) or an array of aggregation types forbidden (each must be prefixed with a bang). In the later case all other aggregations are allowed. If the array has only one element you can also specify it as a string (as shown in the bucket aggregation).
//The types, that you can specify for bucket aggregations' aggFilter are the following: date_histogram, date_range, filters, geohash_grid, histogram, ip_range, range, significant_terms, terms
      },
      {
        group: 'buckets',
        name: 'funs',
        title: 'Funs',
        min: 1,
        max: 1,
        aggFilter: '!geohash_grid'
      }
    ])
  });
}

require('ui/registry/vis_types').register(GeneralProvider);
