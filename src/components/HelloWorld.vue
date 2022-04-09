<template>
	<div>
		<v-card :loading="$apollo.loading" class="mx-auto my-12" max-width="400">
			<template slot="progress">
				<v-progress-linear color="blue" height="2" indeterminate></v-progress-linear>
			</template>

			<v-card-text>
				<v-row align="center">
					<v-col class="text-h3" cols="6">
						{{ weather.temperature }}&deg;C
					</v-col>
					<v-col cols="6">
						<v-img src="../assets/weather_100px.png" alt="Sunny image" width="92"></v-img>
					</v-col>
				</v-row>
			</v-card-text>

			<v-list-item two-line>
				<v-list-item-content>
					<v-list-item-title class="text-h5">
						Los Angeles, US
					</v-list-item-title>
					<v-list-item-subtitle>Last Updated: {{ lastFetched }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-card-actions class="d-flex flex-row justify-space-between">
				<v-btn text @click.native="() => refresh()">
					Update
				</v-btn>
				
				<div v-if="error" class="text-caption red--text">{{ errorMessage }}. Click update to retry</div>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
	import gql from 'graphql-tag'
	
	export default {
		name: 'HelloWorld',

		data: () => ({
			lastFetched: null,
			error: false,
			errorMessage: '',
			weather: {
				temperature: 0,
			},
			updateInterval: null
		}),
		
		mounted() {
			this.setLastfetched()
			
			
		},
		
		methods: {
			setLastfetched() {
				const lang = navigator.language || navigator.languages[0];
				let today = new Date();
				let options = { weekday: 'long', time: '24H' };
				
				this.lastFetched = `${today.toLocaleDateString(lang, options)}  ${today.toLocaleTimeString(lang)}`
			},
			
			refresh() {
				this.$apollo.queries.weather.refetch()
			},
			
			setError(error) {
				this.error = true
				this.errorMessage = error.message
			}
		},
		
		apollo: {
			weather: {
				query: gql`query Weather {
					weather {
						temperature
					}
				}`,
				pollInterval: 60000, //poll for updates every minute
				result () {
					this.error = false
					this.errorMessage = ''
					this.setLastfetched()
				},
				error (error) {
					this.setError(error)
					
					throw error
				},
			}
		},
	}
</script>
