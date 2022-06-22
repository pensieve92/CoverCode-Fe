import uuid from '@/helpers/uuid';
import moment from 'moment';

function Post() {
	this.id = uuid.short();
	this.creDate = moment().format('L');
	this.category = 'no category';
	this.title = 'no title';
	this.content = 'no content';
}

function initPost() {
	return new Post();
}

export { initPost };
