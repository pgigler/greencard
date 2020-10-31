import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn, handleLogin } from "../../util/auth";
import GoogleLogin from "react-google-login";

class Login extends React.Component<{ path: string }, {}> {
	responseGoogle(response) {
		if (response.profileObj && response.tokenObj) {
			handleLogin({
				name: response.profileObj.name,
				email: response.profileObj.email,
				givenName: response.profileObj.givenName,
				familyName: response.profileObj.familyName,
				id_token: response.tokenObj.id_token,
				expires_at: response.tokenObj.expires_at,
			});
		}
	}

	render() {
		if (isLoggedIn()) {
			navigate(`/ops`);
		}

		return (
			<div className="container flex justify-around p-12">
				<GoogleLogin
					clientId={process.env.GATSBY_GOOGLE_CLIENT_ID as string}
					buttonText="Belépés"
					onSuccess={this.responseGoogle}
					onFailure={this.responseGoogle}
					cookiePolicy={"single_host_origin"}
				>
					<span className="font-semibold text-black">Belépés Google-lel</span>
				</GoogleLogin>
			</div>
		);
	}
}

export default Login;
