package handler

import (
	"log"
	"net/http"

	"github.com/minguu42/tomeit/model"
)

func (h *handler) GetHealthz(w http.ResponseWriter, _ *http.Request) {
	if err := writeResponse(w, http.StatusOK, &model.HealthzResponse{
		Status: "OK",
	}); err != nil {
		log.Println("failed to write response.", err)
	}
}
