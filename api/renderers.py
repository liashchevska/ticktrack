from rest_framework.renderers import JSONRenderer

class ApiRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        status_code = renderer_context['response'].status_code
        is_ok = 200 <= status_code < 300
        payload_key = "data" if is_ok else "errors"
        response = {
            "status": status_code,
            payload_key: data    
        }
        return super(ApiRenderer, self).render(response, accepted_media_type, renderer_context)