import { Meteor } from 'meteor/meteor';
import { StrayGear } from '../straygear.jsx';

Meteor.publish('straygear', function straygearPublication(){
	return StrayGear.find();
});