from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

class CustomHTTPException(Exception):
    def __init__(self, status_code: int, detail: str, type: str = "about:blank"):
        self.status_code = status_code
        self.detail = detail
        self.type = type

async def custom_http_exception_handler(request: Request, exc: CustomHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "type": exc.type,
            "title": "Error",
            "status": exc.status_code,
            "detail": exc.detail,
            "instance": str(request.url),
        },
    )

async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "type": "about:blank",
            "title": "HTTP Error",
            "status": exc.status_code,
            "detail": exc.detail,
            "instance": str(request.url),
        },
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "type": "urn:problem-type:validation-error",
            "title": "Validation Error",
            "status": 422,
            "detail": "The request contains invalid parameters.",
            "errors": exc.errors(),
            "instance": str(request.url),
        },
    )
