{% extends '../pageLayout.swig' %}

{% block content %}
    <div class="wrapper {% block wrappingClass %}{% endblock %}">
        {# now set the main block #}
        {% block main_content %}{% endblock %}
    </div>
    {# include the public footer #}
    {% include 'snippets/footer.swig' %}

{% endblock %}