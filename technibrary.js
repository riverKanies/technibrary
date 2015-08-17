

var fb = new Firebase('https://technibrary2.firebaseio.com/');
var fbList = fb.child('nodeList/');


var Node = React.createClass({

	getInitialState: function() {
		return{name:'loading...', desc:'loading...'};
	},
	componentWillMount: function() {
		this.update("technibrary");
	},
	update: function(id) {
		var nodePath = fbList.child(id+'/');
		nodePath.once('value',function(snap){ // read fb data
			//console.log(snap.val());
			this.setState(snap.val()); // set react state
		}.bind(this));

		//!!!get children

	},
	render: function() {
		//console.log(this.state.name);

		//<button onClick={this.pathUp}>^</button><br></br>
		//<button onClick={this.pathDown}>v</button>

		//<b>Node</b>
		//<p> Name: {this.state.name}</p>
		//<p> Description: {this.state.desc}</p>

		console.log('test dom ready');

		return (
			<div>

			      <div className="row">
				    <div className="col s12 m6">

				      <div className="card blue-grey darken-1">
				        <div className="card-content white-text">
				          <span className="card-title">{this.state.name}</span>
				          <p>{this.state.desc}</p>
				        </div>
				      </div>

				      <p> Explore the Technibrary</p>
				      <ChildList data={this.state.down} click={this.update}></ChildList>

				    </div>
				    <div className="col s12 m6">
				    	  <ul className="collapsible" data-collapsible="accordion">
						    <li>
						      <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
						      <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
						    </li>
						    <li>
						      <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
						      <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
						    </li>
						    <li>
						      <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
						      <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
						    </li>
						  </ul>
					</div>
				  </div>


				
			</div>
		);
	}

});

//!!! problem: can't pass key value onClick... need child component?
var ChildList = React.createClass({
	//updateNode: function(key) {this.props.click(key);},
	render: function() {
		var list = this.props.data;
		var childNodes = [];
		for (var key in list) {
		   if (list.hasOwnProperty(key)) {
		   		this.key = key;
		   		//<button onClick={this.updateNode}>{key}</button>
				childNodes.push(<Child id={key} key={key} click={this.props.click}></Child>);
		    }
		}

	  return <div className="childList">{childNodes}</div>;
	}
});

var Child = React.createClass({
	updateNode: function() {
		this.props.click(this.props.id);
	},
	render: function() {
		//console.log(this.props.id);
		//<button onClick={this.updateNode}>{this.props.id}</button>
		return (
			
			<a className="waves-effect waves-light btn" onClick={this.updateNode} >{this.props.id}</a>
		);
	}
});


// how to deal with post dom update code?
// the following needs to happen after html is rendered
//  $(document).ready(function(){
var afterRender = function() {
  	console.log('after render');
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
};

//React.render(JSXcomponent,DOMElement,[function callback]);
React.render(<Node />, document.getElementById('content'), afterRender);


