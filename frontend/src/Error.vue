<template>
	<v-app>
		<v-app-bar app>
			<v-spacer/>
			<h1>Fehler</h1>
			<v-spacer/>
		</v-app-bar>
		<v-main>
			<v-container>
				<v-alert type="error">
					<h3>Ein Fehler ist aufgetreten, bitte kontaktieren Sie Ihren Administrator.</h3>
					Fehlermeldung: {{error.title}} (aufgetreten in {{error.component}})<br>
					<p style="white-space: pre;">{{error.stack}}</p>
				</v-alert>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'Error',
	props: {
		errorData: {
			type: Object,
		},
		title: {
			type: String,
		},
		stack: {
			type: String,
		},
		component: {
			type: String,
		},
	},
	computed: {
		error() {
			const error = {};
			if (Object.prototype.hasOwnProperty.call(this.errorData, 'err')) {
			// Is thrown by Vue error handler
				error.title = this.errorData.err.message;
				error.stack = this.errorData.err.stack;
				// eslint-disable-next-line no-underscore-dangle
				error.component = this.errorData.vm.$options._componentTag;
			} else {
			// Is thrown by global error handler
				error.title = this.errorData.message;
				error.stack = this.errorData.error;
				error.component = `${this.errorData.source}, Zeile: ${this.errorData.lineno}`;
			}
			return error;
		},
	},
	mounted() {
	},
};
</script>
