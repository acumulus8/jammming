const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
let accessToken = accessTokenMatch ? accessTokenMatch[1] : undefined;
const clientId = "56e57a50322842dba3d1374db5b60cce";
// const redirectUri = "http://localhost:3000";
const redirectUri = "https://jammming-proj.netlify.app";

const Spotify = {
	getAccessToken() {
		console.log("___ACCESS TOKEN___", accessToken);
		if (accessToken) {
			return accessToken;
		}

		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);
			window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
			window.history.pushState("Access Token", null, "/");
			return accessToken;
		} else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
		}
	},

	search(term) {
		// if (!accessToken) return [];
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((jsonResponse) => {
				if (!jsonResponse || !jsonResponse.tracks) {
					return [];
				}
				return jsonResponse.tracks.items.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri,
				}));
			});
	},

	savePlaylist(playlistName, trackUri) {
		if (!playlistName || !trackUri) {
			console.log("inside the if statement");
			return [];
		}
		// const accessToken = Spotify.getAccessToken();
		const headers = { Authorization: `Bearer ${accessToken}` };
		let userId;
		return fetch("https://api.spotify.com/v1/me", { headers: headers })
			.then((response) => response.json())
			.then((jsonResponse) => {
				userId = jsonResponse.id;
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					headers: headers,
					contentType: "application/json",
					method: "POST",
					body: JSON.stringify({ name: playlistName }),
				})
					.then((response) => response.json())
					.then((jsonResponse) => {
						const playlistId = jsonResponse.id;
						return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
							headers: headers,
							contentType: "application/json",
							method: "POST",
							body: JSON.stringify({ uris: trackUri }),
						}).then((response) => response.json());
					});
			});
	},
};

export default Spotify;
