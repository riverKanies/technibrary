//NOTES:
	// I'm manually setting the child link data to null because it doesn't update if null otherwise
		//see up method of node: solution is replaceState instead of setState

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
			this.state.down = null;//is this really necessary???
			console.log(snap.val().down);//this changes, but child data it's passed to doesn't... unless the obj exists
			this.setState(snap.val()); // set react state
		}.bind(this));

		//!!!get children

	},
	up: function() {
		var id = this.state.up;
		var nodePath = fbList.child(id+'/');
		nodePath.once('value',function(snap){ // read fb data
			this.replaceState(snap.val()); // setState is an "update", replaceState clears previous
		}.bind(this));

	},
	render: function() {
		//console.log(this.state.name);

		//<button onClick={this.pathUp}>^</button><br></br>
		//<button onClick={this.pathDown}>v</button>

		//<b>Node</b>
		//<p> Name: {this.state.name}</p>
		//<p> Description: {this.state.desc}</p>

		console.log(this.state.down);

		return (
			<div>

			      <div className="row">
				    <div className="col s12 m6">
				      <div className="row">
				      	<div className="col s2 offset-s5">
				    	  <a className="waves-effect waves-light btn" onClick={this.up} >^</a>
				    	</div>
			    	  </div>
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
						      <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p>
								<a class='dropdown-button btn' href='#' data-activates='dropdown1'>Drop Me!</a>
								<ul id='dropdown1' class='dropdown-content'>
								<li><a href="#!">one</a></li>
								<li><a href="#!">two</a></li>
								<li class="divider"></li>
								<li><a href="#!">three</a></li>
								</ul>
						      </div>

								
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
		var list = this.props.data;//is this the problem?
		console.log(list);//defined as object when no data passed!!!
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
			
			<a className="waves-effect waves-light btn" onClick={this.updateNode} ><i className="material-icons">trending_flat</i>{this.props.id}</a>
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


