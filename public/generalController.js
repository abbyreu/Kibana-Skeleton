var module = require('ui/modules').get('Skeleton');

//this is how you retrieve the filter manager service

module.controller('GeneralController', function($scope, Private) {

var filterManager = Private(require('ui/filter_manager'));
//Add new filter via filter manager

$scope.filter = function(fun){
filterManager.add(
//the field to filter for, we can get it from the config
$scope.vis.aggs.bySchemaName['funs'][0].params.field,
//the value to filter for, we will read out the bucket key from the tag
fun.label,
//weather the filter is negated. If you want to create a negated pinter pass '-' here
null,
//index pattern for the filter
//
$scope.vis.indexPattern.title
);
};

$scope.$watch('esResponse', function(resp) {
if (!resp) {
$scope.tags = null;
return;
}

//retrieve the id of the configured funs aggregation
var funsAggId = $scope.vis.aggs.bySchemaName['funs'][0].id;
//get the buckets of that aggregation
var buckets = resp.aggregations[funsAggId].buckets;
//Transform all buckets into tag objects
$scope.tags = buckets.map(function(bucket) {
return {
label: bucket.key,
value: metricsAgg.getValue(bucket)
};
});
});


//our logic goes here
//
//    You can get access to the configured visualization objects via $scope.vis.aggs and the different sub methods: bySchemaName (the names you configured in your schema), bySchemaGroup (metrics or buckets), byTypeName (e.g. count, terms, etc.)
//  To access data inside a bucket you can use the getValue method on the aggregation object.


});
