/* ------------------------------------------------------------------
* node-echonet-lite - desc.js
*
* Copyright (c) 2016, Futomi Hatano, All rights reserved.
* Released under the MIT license
* Date: 2016-07-22
* ---------------------------------------------------------------- */
'use strict';

var EchonetLiteDesc = function() {
	var lang = 'en';
	this.FIELD     = require('./en/FIELD');
	this.EHD1      = require('./en/EHD1');
	this.EHD2      = require('./en/EHD2');
	this.EOJX1     = require('./en/EOJX1');
	this.EOJX2     = require('./en/EOJX2');
	this.ESV       = require('./en/ESV');
	this.EPC       = require('./en/EPC');
	this.EPC_SUPER = require('./en/EPC_SUPER');
	this.epcs = {};
};

EchonetLiteDesc.prototype.setLang = function(lang) {
	var lang = (typeof(lang) === 'string' && lang.match(/^(en|ja)$/)) ? lang : 'en';
	if(lang === this.lang) {
		return lang;
	} else {
		this.lang = lang;
		this.FIELD     = require('./en/FIELD');
		this.EHD1      = require('./en/EHD1');
		this.EHD2      = require('./en/EHD2');
		this.EOJX1     = require('./en/EOJX1');
		this.EOJX2     = require('./en/EOJX2');
		this.ESV       = require('./en/ESV');
		this.EPC       = require('./en/EPC');
		this.EPC_SUPER = require('./en/EPC_SUPER');
	}
	return lang;
};

EchonetLiteDesc.prototype.getFieldName = function(key) {
	return this.FIELD[key] || '';
};

EchonetLiteDesc.prototype.getEHD1Name = function(ehd1_code) {
	return this.EHD1[ehd1_code] || '';
};

EchonetLiteDesc.prototype.getEHD2Name = function(ehd2_code) {
	return this.EHD2[ehd2_code] || '';
};

EchonetLiteDesc.prototype.getClassGroupName = function(class_group_code) {
	return this.EOJX1[class_group_code] || '';
};

EchonetLiteDesc.prototype.getClassName = function(class_group_code, class_code) {
	if(this.EOJX2[class_group_code]) {
		return this.EOJX2[class_group_code][class_code] || '';
	} else {
		return '';
	}
};

EchonetLiteDesc.prototype.getPropertyName = function(class_group_code, class_code, property_code) {
	var class_specific_props = {};
	if(this.EPC[class_group_code] && this.EPC[class_group_code][class_code]) {
		class_specific_props = this.EPC[class_group_code][class_code];
	}
	if(class_specific_props[property_code]) {
		return class_specific_props[property_code];
	} else if(this.EPC_SUPER[property_code]) {
		return this.EPC_SUPER[property_code];
	} else {
		return '';
	}
};

EchonetLiteDesc.prototype.getESVName = function(esv_code) {
	return this.ESV[esv_code] || '';
};

module.exports = new EchonetLiteDesc();
