package com.project.app.models.patterns;

public class JsonResponse {
  private String message;
  private int status;

  public JsonResponse(String message, int status) {
    this.setMessage(message);
    this.setStatus(status);
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }
}
