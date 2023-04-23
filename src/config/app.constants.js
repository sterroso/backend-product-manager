// HTTP response status codes
export const HttpResponseStatusCodes = {
  INFORMATIONAL: {
    CONTINUE: {
      code: 100,
      name: "Continue",
      description:
        "This interim response indicates that the client should continue the request or ignore the response if the request is already finished.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100",
    },
    SWITCHING_PROTOCOLS: {
      code: 101,
      name: "Switching Protocols",
      description:
        "This code is sent in response to an Upgrade request header from the client and indicates the protocol the server is switching to.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101",
    },
    PROCESSING: {
      code: 102,
      name: "Processing",
      description:
        "This code indicates that the server has received and is processing the request, but no response is available yet.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/102",
    },
    EARLY_HINTS: {
      code: 103,
      name: "Early Hints",
      description:
        "This status code is primarily intended to be used with the Link header, letting the user agent start preloading resources while the server prepares a response.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103",
    },
  },
  SUCCESSFUL: {
    OK: {
      code: 200,
      name: "Ok",
      description:
        'The request succeeded. The result meaning of "success" depends on the HTTP method: GET: The resource has been fetched and transmitted in the message body. HEAD: The representation headers are included in the response without any message body. PUT or POST: The resource describing the result of the action is transmitted in the message body. TRACE: The message body contains the request message as received by the server.',
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200",
    },
    CREATED: {
      code: 201,
      name: "Created",
      description:
        "The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201",
    },
    ACCEPTED: {
      code: 202,
      name: "Accepted",
      description:
        "The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202",
    },
    NON_AUTHORITATIVE_INFORMATION: {
      code: 203,
      name: "Non-Authoritative Information",
      description:
        "This response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource. Except for that specific case, the 200 OK response is preferred to this status.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203",
    },
    NO_CONTENT: {
      code: 204,
      name: "No Content",
      description:
        "There is no content to send for this request, but the headers may be useful. The user agent may update its cached headers for this resource with the new ones.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204",
    },
    RESET_CONTENT: {
      code: 205,
      name: "Reset Content",
      description:
        "Tells the user agent to reset the document which sent this request.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205",
    },
    PARTIAL_CONTENT: {
      code: 206,
      name: "Partial Content",
      description:
        "This response code is used when the Range header is sent from the client to request only part of a resource.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206",
    },
    MULTI_STATUS: {
      code: 207,
      name: "Multi-Status",
      description:
        "Conveys information about multiple resources, for situations where multiple status codes might be appropriate.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/207",
    },
    ALREADY_REPORTED: {
      code: 208,
      name: "Already Reported",
      description:
        "Used inside a <dav:propstat> response element to avoid repeatedly enumerating the internal members of multiple bindings to the same collection.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/208",
    },
    IM_USED: {
      code: 226,
      name: "IM Used",
      description:
        "The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/226",
    },
  },
  REDIRECTION: {
    MULTIPLE_CHOICES: {
      code: 300,
      name: "Multiple Choices",
      description:
        "The request has more than one possible response. The user agent or user should choose one of them. (There is no standardized way of choosing one of the responses, but HTML links to the possibilities are recommended so the user can pick.)",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300",
    },
    MOVED_PERMANENTLY: {
      code: 301,
      name: "Moved Permanently",
      description:
        "The URL of the requested resource has been changed permanently. The new URL is given in the response.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301",
    },
    FOUND: {
      code: 302,
      name: "Found",
      description:
        "This response code means that the URI of requested resource has been changed temporarily. Further changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302",
    },
    SEE_OTHER: {
      code: 303,
      name: "See Other",
      description:
        "The server sent this response to direct the client to get the requested resource at another URI with a GET request.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303",
    },
    NOT_MODIFIED: {
      code: 304,
      name: "Not Modified",
      description:
        "This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304",
    },
    TEMPORARY_REDIRECT: {
      code: 307,
      name: "Temporary Redirect",
      description:
        "The server sends this response to direct the client to get the requested resource at another URI with the same method that was used in the prior request. This has the same semantics as the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307",
    },
    PERMANENT_REDIRECT: {
      code: 308,
      name: "Permanent Redirect",
      description:
        "This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308",
    },
  },
  CLIENT_ERROR: {
    BAD_REQUEST: {
      code: 400,
      name: "Bad Request",
      description:
        "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
    },
    UNAUTHORIZED: {
      code: 401,
      name: "Unauthorized",
      description:
        'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401",
    },
    PAYMENT_REQUIRED: {
      code: 402,
      name: "Payment Required",
      description:
        "This response code is reserved for future use. The initial aim for creating this code was using it for digital payment systems, however this status code is used very rarely and no standard convention exists.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402",
    },
    FORBIDDEN: {
      code: 403,
      name: "Forbidden",
      description:
        "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403",
    },
    NOT_FOUND: {
      code: 404,
      name: "Not Found",
      description:
        "The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404",
    },
    METHOD_NOT_ALLOWED: {
      code: 405,
      name: "Method Not Allowed",
      description:
        "The request method is known by the server but is not supported by the target resource. For example, an API may not allow calling DELETE to remove a resource.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405",
    },
    NOT_ACCEPTABLE: {
      code: 406,
      name: "Not Acceptable",
      description:
        "This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content that conforms to the criteria given by the user agent.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406",
    },
    PROXY_AUTHENTICATION_REQUIRED: {
      code: 407,
      name: "Proxy Authentication Required",
      description:
        "This is similar to 401 Unauthorized but authentication is needed to be done by a proxy.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407",
    },
    REQUEST_TIMEOUT: {
      code: 408,
      name: "Request Timeout",
      description:
        "This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408",
    },
    CONFLICT: {
      code: 409,
      name: "Confict",
      description:
        "This response is sent when a request conflicts with the current state of the server.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409",
    },
    GONE: {
      code: 410,
      name: "Gone",
      description:
        'This response is sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.',
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410",
    },
    LENGTH_REQUIRED: {
      code: 411,
      name: "Length Required",
      description:
        "Server rejected the request because the Content-Length header field is not defined and the server requires it.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411",
    },
    PRECONDITION_FAILED: {
      code: 412,
      name: "Precondition Failed",
      description:
        "The client has indicated preconditions in its headers which the server does not meet.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412",
    },
    PAYLOAD_TOO_LARGE: {
      code: 413,
      name: "Payload Too Large",
      description:
        "Request entity is larger than limits defined by server. The server might close the connection or return an Retry-After header field.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413",
    },
    URI_TOO_LONG: {
      code: 414,
      name: "URI Too Long",
      description:
        "The URI requested by the client is longer than the server is willing to interpret.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414",
    },
    UNSUPPORTED_MEDIA_TYPE: {
      code: 415,
      name: "Unsupported Media Type",
      description:
        "The media format of the requested data is not supported by the server, so the server is rejecting the request.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415",
    },
    RANGE_NOT_SATISFIABLE: {
      code: 416,
      name: "Range Not Satisfiable",
      description:
        "The range specified by the Range header field in the request cannot be fulfilled. It's possible that the range is outside the size of the target URI's data.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416",
    },
    EXPECTATION_FAILED: {
      code: 417,
      name: "Expectation Failed",
      description:
        "This response code means the expectation indicated by the Expect request header field cannot be met by the server.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417",
    },
    IM_A_TEAPOT: {
      code: 418,
      name: "I'm a Teapot",
      description:
        "The server refuses the attempt to brew coffee with a teapot.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418",
    },
    MISDIRECTED_REQUEST: {
      code: 421,
      name: "Misdirected Request",
      description:
        "The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421",
    },
    UNPROCESSABLE_CONTENT: {
      code: 422,
      name: "Unprocessable Content",
      description:
        "The request was well-formed but was unable to be followed due to semantic errors.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422",
    },
    LOCKED: {
      code: 423,
      name: "Locked",
      description: "The resource that is being accessed is locked.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423",
    },
    FAILED_DEPENDENCY: {
      code: 424,
      name: "Failed Dependency",
      description: "The request failed due to failure of a previous request.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424",
    },
    TOO_EARLY: {
      code: 425,
      name: "Too Early",
      description:
        "Indicates that the server is unwilling to risk processing a request that might be replayed.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425",
    },
    UPGRADE_REQUIRED: {
      code: 426,
      name: "Upgrade Required",
      description:
        "The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to indicate the required protocol(s).",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426",
    },
    PRECONDITION_REQUIRED: {
      code: 428,
      name: "Precondition Required",
      description:
        "The origin server requires the request to be conditional. This response is intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428",
    },
    TOO_MANY_REQUESTS: {
      code: 429,
      name: "Too Many Requests",
      description:
        'The user has sent too many requests in a given amount of time ("rate limiting").',
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429",
    },
    REQUEST_HEADER_FIELDS_TOO_LARGE: {
      code: 431,
      name: "Request Header Fields Too Large",
      description:
        "The server is unwilling to process the request because its header fields are too large. The request may be resubmitted after reducing the size of the request header fields.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431",
    },
    UNAVAILABLE_FOR_LEGAL_REASONS: {
      code: 451,
      name: "Unavailable for Legal Reasons",
      description:
        "The user agent requested a resource that cannot legally be provided, such as a web page censored by a government.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451",
    },
  },
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: {
      code: 500,
      name: "Internal Server Error",
      description:
        "The server has encountered a situation it does not know how to handle.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500",
    },
    NOT_IMPLEMENTED: {
      code: 501,
      name: "Not Implemented",
      description:
        "The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501",
    },
    BAD_GATEWAY: {
      code: 502,
      name: "Bad Gateway",
      description:
        "This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502",
    },
    SERVICE_UNAVAILABLE: {
      code: 503,
      name: "Service Unavailable",
      description:
        "The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This response should be used for temporary conditions and the Retry-After HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503",
    },
    GATEWAY_TIMEOUT: {
      code: 504,
      name: "Gateway Timeout",
      description:
        "This error response is given when the server is acting as a gateway and cannot get a response in time.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504",
    },
    HTTP_VERSION_NOT_SUPPORTED: {
      code: 505,
      name: "HTTP Version Not Supported",
      description:
        "The HTTP version used in the request is not supported by the server.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505",
    },
    VARIANT_ALSO_NEGOTIATES: {
      code: 506,
      name: "Variant Also Negotiates",
      description:
        "The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506",
    },
    INSUFFICIENT_STORAGE: {
      code: 507,
      name: "Insufficient Storage",
      description:
        "The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507",
    },
    LOOP_DETECTED: {
      code: 508,
      name: "Loop Detected",
      description:
        "The server detected an infinite loop while processing the request.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508",
    },
    NOT_EXTENDED: {
      code: 510,
      name: "Not Extended",
      description:
        "Further extensions to the request are required for the server to fulfill it.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510",
    },
    NETWORK_AUTHENTICATION_REQUIRED: {
      code: 511,
      name: "Network Authentication Required",
      description:
        "Indicates that the client needs to authenticate to gain network access.",
      reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511",
    },
  },
};

export const HttpStatus = {
  CONTINUE: {
    code: 100,
    name: "Continue",
    description:
      "This interim response indicates that the client should continue the request or ignore the response if the request is already finished.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100",
  },
  SWITCHING_PROTOCOLS: {
    code: 101,
    name: "Switching Protocols",
    description:
      "This code is sent in response to an Upgrade request header from the client and indicates the protocol the server is switching to.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101",
  },
  PROCESSING: {
    code: 102,
    name: "Processing",
    description:
      "This code indicates that the server has received and is processing the request, but no response is available yet.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/102",
  },
  EARLY_HINTS: {
    code: 103,
    name: "Early Hints",
    description:
      "This status code is primarily intended to be used with the Link header, letting the user agent start preloading resources while the server prepares a response.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103",
  },
  OK: {
    code: 200,
    name: "Ok",
    description:
      'The request succeeded. The result meaning of "success" depends on the HTTP method: GET: The resource has been fetched and transmitted in the message body. HEAD: The representation headers are included in the response without any message body. PUT or POST: The resource describing the result of the action is transmitted in the message body. TRACE: The message body contains the request message as received by the server.',
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200",
  },
  CREATED: {
    code: 201,
    name: "Created",
    description:
      "The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201",
  },
  ACCEPTED: {
    code: 202,
    name: "Accepted",
    description:
      "The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202",
  },
  NON_AUTHORITATIVE_INFORMATION: {
    code: 203,
    name: "Non-Authoritative Information",
    description:
      "This response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource. Except for that specific case, the 200 OK response is preferred to this status.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203",
  },
  NO_CONTENT: {
    code: 204,
    name: "No Content",
    description:
      "There is no content to send for this request, but the headers may be useful. The user agent may update its cached headers for this resource with the new ones.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204",
  },
  RESET_CONTENT: {
    code: 205,
    name: "Reset Content",
    description:
      "Tells the user agent to reset the document which sent this request.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205",
  },
  PARTIAL_CONTENT: {
    code: 206,
    name: "Partial Content",
    description:
      "This response code is used when the Range header is sent from the client to request only part of a resource.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206",
  },
  MULTI_STATUS: {
    code: 207,
    name: "Multi-Status",
    description:
      "Conveys information about multiple resources, for situations where multiple status codes might be appropriate.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/207",
  },
  ALREADY_REPORTED: {
    code: 208,
    name: "Already Reported",
    description:
      "Used inside a <dav:propstat> response element to avoid repeatedly enumerating the internal members of multiple bindings to the same collection.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/208",
  },
  IM_USED: {
    code: 226,
    name: "IM Used",
    description:
      "The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/226",
  },
  MULTIPLE_CHOICES: {
    code: 300,
    name: "Multiple Choices",
    description:
      "The request has more than one possible response. The user agent or user should choose one of them. (There is no standardized way of choosing one of the responses, but HTML links to the possibilities are recommended so the user can pick.)",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300",
  },
  MOVED_PERMANENTLY: {
    code: 301,
    name: "Moved Permanently",
    description:
      "The URL of the requested resource has been changed permanently. The new URL is given in the response.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301",
  },
  FOUND: {
    code: 302,
    name: "Found",
    description:
      "This response code means that the URI of requested resource has been changed temporarily. Further changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302",
  },
  SEE_OTHER: {
    code: 303,
    name: "See Other",
    description:
      "The server sent this response to direct the client to get the requested resource at another URI with a GET request.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303",
  },
  NOT_MODIFIED: {
    code: 304,
    name: "Not Modified",
    description:
      "This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304",
  },
  TEMPORARY_REDIRECT: {
    code: 307,
    name: "Temporary Redirect",
    description:
      "The server sends this response to direct the client to get the requested resource at another URI with the same method that was used in the prior request. This has the same semantics as the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307",
  },
  PERMANENT_REDIRECT: {
    code: 308,
    name: "Permanent Redirect",
    description:
      "This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308",
  },
  BAD_REQUEST: {
    code: 400,
    name: "Bad Request",
    description:
      "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
  },
  UNAUTHORIZED: {
    code: 401,
    name: "Unauthorized",
    description:
      'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401",
  },
  PAYMENT_REQUIRED: {
    code: 402,
    name: "Payment Required",
    description:
      "This response code is reserved for future use. The initial aim for creating this code was using it for digital payment systems, however this status code is used very rarely and no standard convention exists.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402",
  },
  FORBIDDEN: {
    code: 403,
    name: "Forbidden",
    description:
      "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403",
  },
  NOT_FOUND: {
    code: 404,
    name: "Not Found",
    description:
      "The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404",
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    name: "Method Not Allowed",
    description:
      "The request method is known by the server but is not supported by the target resource. For example, an API may not allow calling DELETE to remove a resource.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405",
  },
  NOT_ACCEPTABLE: {
    code: 406,
    name: "Not Acceptable",
    description:
      "This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content that conforms to the criteria given by the user agent.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406",
  },
  PROXY_AUTHENTICATION_REQUIRED: {
    code: 407,
    name: "Proxy Authentication Required",
    description:
      "This is similar to 401 Unauthorized but authentication is needed to be done by a proxy.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407",
  },
  REQUEST_TIMEOUT: {
    code: 408,
    name: "Request Timeout",
    description:
      "This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408",
  },
  CONFLICT: {
    code: 409,
    name: "Confict",
    description:
      "This response is sent when a request conflicts with the current state of the server.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409",
  },
  GONE: {
    code: 410,
    name: "Gone",
    description:
      'This response is sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.',
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410",
  },
  LENGTH_REQUIRED: {
    code: 411,
    name: "Length Required",
    description:
      "Server rejected the request because the Content-Length header field is not defined and the server requires it.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411",
  },
  PRECONDITION_FAILED: {
    code: 412,
    name: "Precondition Failed",
    description:
      "The client has indicated preconditions in its headers which the server does not meet.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412",
  },
  PAYLOAD_TOO_LARGE: {
    code: 413,
    name: "Payload Too Large",
    description:
      "Request entity is larger than limits defined by server. The server might close the connection or return an Retry-After header field.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413",
  },
  URI_TOO_LONG: {
    code: 414,
    name: "URI Too Long",
    description:
      "The URI requested by the client is longer than the server is willing to interpret.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414",
  },
  UNSUPPORTED_MEDIA_TYPE: {
    code: 415,
    name: "Unsupported Media Type",
    description:
      "The media format of the requested data is not supported by the server, so the server is rejecting the request.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415",
  },
  RANGE_NOT_SATISFIABLE: {
    code: 416,
    name: "Range Not Satisfiable",
    description:
      "The range specified by the Range header field in the request cannot be fulfilled. It's possible that the range is outside the size of the target URI's data.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416",
  },
  EXPECTATION_FAILED: {
    code: 417,
    name: "Expectation Failed",
    description:
      "This response code means the expectation indicated by the Expect request header field cannot be met by the server.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417",
  },
  IM_A_TEAPOT: {
    code: 418,
    name: "I'm a Teapot",
    description: "The server refuses the attempt to brew coffee with a teapot.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418",
  },
  MISDIRECTED_REQUEST: {
    code: 421,
    name: "Misdirected Request",
    description:
      "The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421",
  },
  UNPROCESSABLE_CONTENT: {
    code: 422,
    name: "Unprocessable Content",
    description:
      "The request was well-formed but was unable to be followed due to semantic errors.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422",
  },
  LOCKED: {
    code: 423,
    name: "Locked",
    description: "The resource that is being accessed is locked.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423",
  },
  FAILED_DEPENDENCY: {
    code: 424,
    name: "Failed Dependency",
    description: "The request failed due to failure of a previous request.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424",
  },
  TOO_EARLY: {
    code: 425,
    name: "Too Early",
    description:
      "Indicates that the server is unwilling to risk processing a request that might be replayed.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425",
  },
  UPGRADE_REQUIRED: {
    code: 426,
    name: "Upgrade Required",
    description:
      "The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to indicate the required protocol(s).",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426",
  },
  PRECONDITION_REQUIRED: {
    code: 428,
    name: "Precondition Required",
    description:
      "The origin server requires the request to be conditional. This response is intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428",
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    name: "Too Many Requests",
    description:
      'The user has sent too many requests in a given amount of time ("rate limiting").',
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429",
  },
  REQUEST_HEADER_FIELDS_TOO_LARGE: {
    code: 431,
    name: "Request Header Fields Too Large",
    description:
      "The server is unwilling to process the request because its header fields are too large. The request may be resubmitted after reducing the size of the request header fields.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431",
  },
  UNAVAILABLE_FOR_LEGAL_REASONS: {
    code: 451,
    name: "Unavailable for Legal Reasons",
    description:
      "The user agent requested a resource that cannot legally be provided, such as a web page censored by a government.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    name: "Internal Server Error",
    description:
      "The server has encountered a situation it does not know how to handle.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500",
  },
  NOT_IMPLEMENTED: {
    code: 501,
    name: "Not Implemented",
    description:
      "The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501",
  },
  BAD_GATEWAY: {
    code: 502,
    name: "Bad Gateway",
    description:
      "This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502",
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    name: "Service Unavailable",
    description:
      "The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This response should be used for temporary conditions and the Retry-After HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503",
  },
  GATEWAY_TIMEOUT: {
    code: 504,
    name: "Gateway Timeout",
    description:
      "This error response is given when the server is acting as a gateway and cannot get a response in time.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504",
  },
  HTTP_VERSION_NOT_SUPPORTED: {
    code: 505,
    name: "HTTP Version Not Supported",
    description:
      "The HTTP version used in the request is not supported by the server.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505",
  },
  VARIANT_ALSO_NEGOTIATES: {
    code: 506,
    name: "Variant Also Negotiates",
    description:
      "The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506",
  },
  INSUFFICIENT_STORAGE: {
    code: 507,
    name: "Insufficient Storage",
    description:
      "The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507",
  },
  LOOP_DETECTED: {
    code: 508,
    name: "Loop Detected",
    description:
      "The server detected an infinite loop while processing the request.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508",
  },
  NOT_EXTENDED: {
    code: 510,
    name: "Not Extended",
    description:
      "Further extensions to the request are required for the server to fulfill it.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510",
  },
  NETWORK_AUTHENTICATION_REQUIRED: {
    code: 511,
    name: "Network Authentication Required",
    description:
      "Indicates that the client needs to authenticate to gain network access.",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511",
  },
};

// Paginate plugin custom labels
export const PaginateCustomLabels = {
  totalDocs: "totalRecords",
  docs: "payload",
};

export const PaginateNoLabels = {
  totalDocs: "totalRecords",
  docs: "payload",
  limit: false,
  offset: false,
  page: false,
  nextPage: false,
  prevPage: false,
  hasNextPage: false,
  hasPrevPage: false,
  totalPages: false,
  pagingCounter: false,
  meta: false,
};

export const Status100 = HttpResponseStatusCodes.INFORMATIONAL;

export const Status200 = HttpResponseStatusCodes.SUCCESSFUL;

export const Status300 = HttpResponseStatusCodes.REDIRECTION;

export const Status400 = HttpResponseStatusCodes.CLIENT_ERROR;

export const Status500 = HttpResponseStatusCodes.SERVER_ERROR;

export { HttpResponseStatusCodes as StatusCodes };
