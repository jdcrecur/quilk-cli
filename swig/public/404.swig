{% extends '_layout.swig' %}

{% block title %}Lost your GeeNees?{% endblock %}

{% block content %}
<div class="container">

	<div class="jumbotron text-center">
		<h1>Lost on {[ siteDetails.siteName ]}</h1>
		<p>Hmm... it seems you have lost you way.</p>
		<br>
		<p>The page you were looking for, "{[url]}" doesn't actually exist.</p>
		<a href="/" class="btn btn-default"><span class="fa fa-user"></span> Home page</a>
	</div>

</div>
{% endblock %}