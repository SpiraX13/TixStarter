var React = require("react");
var ClientActions = require('../../actions/client_actions');

var LoginModal = React.createClass({

	getInitialState: function(){
		return {form: "login"};
	},

	setForm: function(keyboardEvent){
		this.setState({form: keyboardEvent.currentTarget.value});
	},

	handleSubmit: function(keyboardEvent){
		keyboardEvent.preventDefault();
		ClientActions[this.state.form]({
			username: this.state.username,
			password: this.state.password
		});
	},

	logout: function(keyboardEvent){
		keyboardEvent.preventDefault();
		ClientActions.logout();
	},

	greeting: function(){
		if (!this.state.currentUser) {
			return;
		}

		return(
			<div>
				<h2>Hi, {this.state.currentUser.username}!</h2>
				<input type="submit" value="logout" onClick={this.logout}/>
			</div>
		);
	},

	errors: function(){
		if (!this.state.userErrors){
			return;
		}

		var self = this;
		return (<ul>
			{
				Object.keys(this.state.userErrors).map(function(key, i){
					return (<li key={i}>{self.state.userErrors[key]}</li>);
				})
			}
		</ul>);
	},

	form: function(){
		if (this.state.currentUser){
			return;
		}

		return(
			<form onSubmit={this.handleSubmit}>
				<section>
					<label> Username:
						<input type="text" valueLink={this.linkState("username")}/>
					</label>

					<label> Password:
						<input type="password" valueLink={this.linkState("password")}/>
					</label>
				</section>

				<section>
					<label> Login
						<input type="Radio" name="action" value="login" onChange={this.setForm}/>
					</label>

					<label> Sign Up
						<input type="Radio" name="action" value="signup" onChange={this.setForm}/>
					</label>
				</section>

				<input type="Submit" value="Submit"/>
			</form>
		);
	},

	render: function(){
		return(
			<div id="login-form">
				{this.greeting()}
				{this.errors()}
				{this.form()}
			</div>
		);
	}
});

module.exports = LoginModal;
