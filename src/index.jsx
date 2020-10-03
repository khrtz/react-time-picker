import React from 'react';
import assign from 'object-assign';
import normalize from 'react-style-normalizer';
import parseTime from './parseTime';
import updateTime from './updateTime';
import toUpperFirst from './toUpperFirst';
import hasTouch from 'has-touch';
import EVENT_NAMES from 'react-event-names';
import twoDigits from './twoDigits';
import getFormatInfo from './getFormatInfo';
import format from './format';
import formatTime from './formatTime';

function identity(v){ return v }
function emptyFn(){}

const WHITESPACE = '\u00a0'

export default class TimePicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			defaultValue: this.props.defaultValue,
			focused: {
				hour    : null,
				minute  : null,
				second  : null,
				meridian: null
			},
			overArrow: {
				hour: null,
				minute: null,
				second: null,
				meridian: null
			}
		}
	}

	componentWillUnmount() {
		this.stopInterval()
	}

	normalize(style) {
		return normalize(style)
	}

	render() {
		const props = this.prepareProps(this.props, this.state)

		if (!props.normalizeStyle){
			this.normalize = identity
		}

		const hour     = this.renderHour(props)
		const minute   = this.renderMinute(props)
		const second   = this.renderSecond(props)
		const meridian = this.renderMeridian(props)

		const separator       = props.separator || <span style={props.separatorStyle}>{WHITESPACE + ':' + WHITESPACE}</span>
		const hourSeparator   = hour && (minute || second || meridian)? props.hourSeparator || separator: null
		const minuteSeparator = minute && (second || meridian)? props.minuteSeparator || separator: null
		const secondSeparator = (second && meridian)? props.secondSeparator || separator: null

		return <div {...props}>
			{hour}
			{hourSeparator}
			{minute}
			{minuteSeparator}
			{second}
			{secondSeparator}
			{meridian}
		</div>
	}

	onArrowMouseEnter(props, dir, name, event) {
		let overArrow = this.state.overArrow
		this.isMouseEnter = true;

		Object.keys(overArrow).forEach(function(key){
			overArrow[key] = null
		})

		overArrow[name] = dir

		this.setState({})
	}

	onArrowMouseLeave(props, dir, name, event) {
		this.isMouseEnter = false;
		this.state.overArrow[name] = null

		this.setState({})
	}

	onArrowMouseDown(props, dir, name, event) {
		// Fixed though there was a bat when right-clicked long pressed.
		if (event.button === 2 || event.shiftKey || event.altkey || event.ctrlKey) {
			return;
		}

		if (name === 'meridian') {
			this.onArrowMeridianAction(props, dir, name);
			return;
		}

		const target = hasTouch?
		                event.target:
		                window
		const eventName = hasTouch?
							'touchend':
							'click'

		target.addEventListener(eventName, this.onWindowClick.bind(this))

		this.onArrowAction(props, dir, name)

		this.timeoutId = setTimeout(function(){
			this.startInterval(props, dir, name)
		}.bind(this), props.stepDelay)
	}

	onWindowClick() {
		this.stopInterval();
	}

	stopInterval() {
		clearTimeout(this.timeoutId);
		clearInterval(this.intervalId);
	}

	startInterval(props, dir, name) {
		this.intervalId = setInterval(function() {
			this.onArrowAction(props, dir, name)
		}.bind(this), props.stepDelay)
	}

	onMeridianInputMouseDown(props, event){
		event.preventDefault()
		this.onArrowMeridianAction(props, 1, 'meridian')
	}

	onArrowMeridianAction(props, dir, name) {
		const currentMeridian = this.time.meridian
		const lowercase = currentMeridian == 'am' || currentMeridian == 'pm'

		const newValue = lowercase?
							currentMeridian == 'am'? 'pm': 'am'
							:
							currentMeridian == 'AM'? 'PM': 'AM'

		this.updateValue(name, newValue);
	}

	onArrowAction(props, dir, name) {
		// Ignored if the mouse is out of the arrow button.
		if (!this.isMouseEnter) {
			return;
		}
		const dirName = dir == 1? 'Up': 'Down'
		let methodName = 'onArrow' + dirName + toUpperFirst(name) + 'Action'

		if (typeof this[methodName] == 'function'){
			this[methodName](props)
		}

		methodName = 'onArrow' + toUpperFirst(name) + 'Action'

		if (typeof this[methodName] == 'function'){
			this[methodName](props, dir)
		}

		this.incValue(props, name, dir)
	}

	incValue(props, name, dir) {
		dir = dir || 0;

		const step     = props[name + 'Step'] || props.step;
		const amount   = dir * step;
		const time     = this.time;
		const oldValue = time[name];
		const newValue = oldValue + amount;

		// this.setValue(time)
		this.updateValue(name, newValue);
	}

	updateValue(name, newValue, config) {
		this.setValue(this.updateTime(name, newValue, config))
	}

	updateTime(name, newValue, config) {
		config = config || {};
		config.overflowHourToMeridian = this.props.overflowHourToMeridian;

		let time = this.time;

		time = updateTime(time, name, newValue, config);

		return this.time = time;
	}

	setValue(time) {
		if (this.props.value == null) {
			this.setState({
				defaultValue: time
			})
		}

		;(this.props.onChange || emptyFn)(this.props.timeToString(time, this.props.format), assign({}, time))
	}

	format(props, name, value) {
		let renderFn

		if (arguments.length < 3){
			value = props.time[name]
		}

		if (name != 'meridian'){
			renderFn = props['render' + toUpperFirst(name)]
		} else {
			renderFn = props.renderMeridian
		}

		if (!renderFn && typeof props.format == 'string'){
			const formatInfo = this.formatInfo
			renderFn = function(value, name){
				return format(name, value, formatInfo)
			}
		}

		if (!renderFn){
			renderFn = twoDigits
		}

		if (typeof renderFn == 'function'){
			value = renderFn(value, name, props)
		}

		return value
	}

	renderBox(props, name) {
		const state = this.state;
		const style = props[name + 'Style'];
		const inputStyle = props[name + 'InputStyle'];
		const upperName  = toUpperFirst(name);

		let value;
		if (!state.focused[name]) {
			value = this.format(props, name);
		} else {
			value = state.focused[name].value;
		}

		let arrowUp;
		let arrowDown;

		if (props.showArrows){
			let overArrow = this.state.overArrow[name]

			let arrowUpStyle = props.arrowUpStyle

			if (overArrow == 1){
				arrowUpStyle = assign({},
									props.arrowUpStyle,
									props.defaultArrowOverStyle,
									props.defaultArrowUpOverStyle,
									props.arrowOverStyle,
									props.arrowUpOverStyle
								)
			}

			let arrowUpProps = {
				mouseOver: overArrow == 1,
				style    : arrowUpStyle,
				children : '▲'
			}

			arrowUpProps[EVENT_NAMES.onMouseDown] = this.onArrowMouseDown.bind(this, props, 1, name)
			arrowUpProps.onMouseEnter = this.onArrowMouseEnter.bind(this, props, 1, name)
			arrowUpProps.onMouseLeave = this.onArrowMouseLeave.bind(this, props, 1, name)

			let arrowDownStyle = props.arrowDownStyle

			if (overArrow == -1){
				arrowDownStyle = assign({},
									props.arrowDownStyle,
									props.defaultArrowOverStyle,
									props.defaultArrowDownOverStyle,
									props.arrowOverStyle,
									props.arrowDownOverStyle
								)
			}

			let arrowDownProps = {
				mouseOver: overArrow == -1,
				style    : arrowDownStyle,
				children : '▼'
			}

			arrowDownProps[EVENT_NAMES.onMouseDown] = this.onArrowMouseDown.bind(this, props, -1, name)
			arrowDownProps.onMouseEnter = this.onArrowMouseEnter.bind(this, props, -1, name)
			arrowDownProps.onMouseLeave = this.onArrowMouseLeave.bind(this, props, -1, name)

			const defaultArrowFactory = props.defaultArrowFactory
			const arrowUpFactory = props.arrowUpFactory || props.arrowFactory || defaultArrowFactory
			const arrowDownFactory = props.arrowDownFactory || props.arrowFactory || defaultArrowFactory

			arrowUp = arrowUpFactory(arrowUpProps)

			if (arrowUp === undefined){
				arrowUp = defaultArrowFactory(arrowUpProps)
			}

			arrowDown = arrowDownFactory(arrowDownProps)
			if (arrowDown === undefined){
				arrowDown = defaultArrowFactory(arrowDownProps)
			}
		}

		const defaultInputFactory = props.defaultInputFactory;
		const inputFactory = props[name + 'InputFactory'] || props.inputFactory || defaultInputFactory;

		let defaultInputProps = props['default' + upperName + 'InputProps'];
		let inputProps        = props[name + 'InputProps'];

		inputProps = assign({}, props.inputProps, defaultInputProps, inputProps, {
			timeName: name,
			style   : inputStyle,
			value   : value,
      onBlur  : this.handleInputBlur.bind(this, props, name),
      onChange: this.handleInputChange.bind(this, props, name),
      onFocus : this.handleInputFocus.bind(this, props, name),
      onKeyUp : this.handleInputKeyUp.bind(this, props, name)
		})

		if (name == 'meridian'){
			inputProps.onMouseDown = this.onMeridianInputMouseDown.bind(this, props);
		}

		let input = inputFactory(inputProps);

		if (input === undefined){
			input = defaultInputFactory(inputProps);
		}


		return <div style={style}>
			{arrowUp}
			{input}
			{arrowDown}
		</div>
	}

	handleInputFocus(props, name, event) {
		let focused = this.state.focused

		focused[name] = {
			value: this.format(props, name)
		}

		this.stopInterval()

		this.setState({})
	}

	handleInputBlur(props, name, event) {

		this.state.focused[name] = null;
		this.setState({});

		let time;
		let value = event.target.value * 1;

		this.updateValue(name, value, {
			clamp: props.clamp
		})
	}

	handleInputChange(props, name, event) {
		if (this.state.focused[name]) {
			this.state.focused[name].value = event.target.value;
		}

		this.setState({});
		props.stopChangePropagation && event.stopPropagation();
  }

  handleInputKeyUp(props, name, event) {
    if (event.key === 'ArrowDown') {
      this.incValue(props, name, -1);
    }
    if (event.key === 'ArrowUp') {
      this.incValue(props, name, 1);
    }
    this.setState({focused: {}});
  }

	getTime() {
		const strict = this.props.strict;
		const formatInfo = this.formatInfo = getFormatInfo(this.props.format);

		return parseTime(this.getValue(), {
			strict: strict,

			hour    : formatInfo.hour,
			minute  : formatInfo.minute,
			second  : formatInfo.second,
			meridian: formatInfo.meridian
		})
	}

	prepareTime(props, state) {
		let timeValue  = this.getTime()
		let formatInfo = this.props.format?
							this.formatInfo:
							null

		props.showSecond = formatInfo?
								formatInfo.second.specified:
								timeValue.second !== undefined

		props.showMinute = formatInfo?
								formatInfo.minute.specified:
								timeValue.minute !== undefined

		props.withMeridian = formatInfo?
								formatInfo.meridian.specified:
								timeValue.meridian != null

		return timeValue
	}

	getValue() {
	    let value = this.props.value == null?
	                    this.state.defaultValue:
	                    this.props.value;

	    return value;
	}

	renderHour(props) {
		return this.renderBox(props, 'hour');
	}

	renderMinute(props) {
		if (props.showMinute) {
			return this.renderBox(props, 'minute');
		}
	}

	renderSecond(props) {
		if (props.showSecond) {
			return this.renderBox(props, 'second');
		}
	}

	renderMeridian(props) {
		if (props.withMeridian) {
			return this.renderBox(props, 'meridian');
		}
	}

	prepareProps(thisProps, state) {
		let props = assign({}, thisProps);

		this.time = props.time = this.prepareTime(props, state);
		this.prepareStyles(props, state);

		return props;
	}

	prepareStyles(props, state) {
		props.style = this.prepareStyle(props, state);
		props.separatorStyle = this.prepareSeparatorStyle(props, state);
		this.prepareArrowStyles(props, state);
		this.prepareHourStyles(props, state);
		this.prepareMinuteStyles(props, state);
		this.prepareSecondStyles(props, state);
		this.prepareMeridianStyles(props, state);
	}

	prepareStyle(props, state) {
		return this.normalize(assign({}, props.defaultStyle, props.style));
	}

	prepareSeparatorStyle(props, state) {
		return this.normalize(assign({}, props.defaultSeparatorStyle, props.separatorStyle));
	}

	prepareArrowStyles(props, state) {
		props.arrowUpStyle = this.normalize(assign({}, props.defaultArrowStyle, props.defaultArrowUpStyle, props.arrowStyle, props.arrowUpStyle));
		props.arrowDownStyle = this.normalize(assign({}, props.defaultArrowStyle, props.defaultArrowDownStyle, props.arrowStyle, props.arrowDownStyle));
	}

	prepareHourStyles(props, state) {
		props.hourStyle = this.prepareHourStyle(props, state);
		props.hourInputStyle = this.prepareHourInputStyle(props, state);
	}

	prepareHourStyle(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultHourStyle, props.boxStyle, props.hourStyle));
	}

	prepareHourInputStyle(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultHourInputStyle, props.inputStyle, props.hourInputStyle));
	}

	prepareMinuteStyles(props, state) {
		props.minuteStyle = this.prepareMinuteStyle(props, state);
		props.minuteInputStyle = this.prepareMinuteInputStyle(props, state);
	}

	prepareMinuteStyle(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultMinuteStyle, props.boxStyle, props.minuteStyle));
	}

	prepareMinuteInputStyle(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultMinuteInputStyle, props.inputStyle, props.minuteInputStyle));
	}

	prepareSecondStyles(props, state) {
		if (props.showSecond) {
			props.secondStyle = this.prepareSecondStyle(props, state);
			props.secondInputStyle = this.prepareSecondInputStyle(props, state);
		}
	}

	prepareSecondStyle(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultSecondStyle, props.boxStyle, props.secondStyle));
	}

	prepareSecondInputStyle(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultSecondInputStyle, props.inputStyle, props.secondInputStyle));
	}

	prepareMeridianStyles(props, state) {
		if (props.withMeridian) {
			props.meridianStyle = this.prepareMeridianStyle(props, state);
			props.meridianInputStyle = this.prepareMeridianInputStyle(props, state);
		}
	}

	prepareMeridianStyle(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultMeridianStyle, props.boxStyle, props.meridianStyle));
	}

	prepareMeridianInputStyle(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultMeridianInputStyle, props.inputStyle, props.meridianInputStyle));
	}
}

TimePicker.defaultProps = {
		normalizeStyle: true,
		stopChangePropagation: true,

		//makes 15:78 be converted to 15:00, and not to 16:18
		strict: true,
		overflowHourToMeridian: true,

		step: 1,
		hourStep: null,
		minuteStep: null,
		secondStep: null,

		stepDelay: 60,
		showArrows: true,

		defaultStyle: {
			border: '1px solid gray',
			padding: 10,
			display: 'inline-flex',
			alignItems: 'center',
			boxSizing: 'border-box',
			flexFlow: 'row',
			width: 200
		},

		defaultArrowStyle: {
			cursor: 'pointer',
			userSelect: 'none',
			display: 'inline-block',
			alignSelf: 'stretch',
			textAlign: 'center'
		},

		defaultArrowOverStyle: {
			background: 'rgb(229, 229, 229)'
		},

		defaultArrowUpOverStyle: null,
		defaultArrowDownOverStyle: null,

		defaultArrowUpStyle: {
			marginBottom: 5
		},

		defaultArrowDownStyle: {
			marginTop: 5
		},

		defaultBoxStyle: {
			boxSizing : 'border-box',
			display   : 'flex',
			flexFlow  : 'column',
			alignItems: 'center'
		},

		defaultInputStyle: {
			boxSizing: 'border-box',
			width    : '100%',
			textAlign: 'center'
		},

		defaultSeparatorStyle: {
			flex: 'none'
		},

		defaultMeridianInputStyle: {
			cursor: 'pointer'
		},

		defaultMeridianInputProps: {
			readOnly: true
		},

		// format: 'HHmmssa',
		renderHour: null,
		renderMinute: null,
		renderSecond: null,
		renderMeridian: null,

		defaultArrowFactory: React.DOM.span,

		arrowFactory: null,
		arrowUpFactory: null,
		arrowDownFactory: null,

		defaultInputFactory: React.DOM.input,
		inputFactory: null,

		hourInputFactory: null,
		minuteInputFactory: null,
		secondInputFactory: null,
		meridianInputFactory: null,

		timeToString: formatTime
	}
