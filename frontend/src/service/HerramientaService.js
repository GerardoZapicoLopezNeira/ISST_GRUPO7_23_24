import axios from "axios";

const HERRAMIENTA_REST_API_BASE_URL = "http://localhost:9090/api/v1/herramientas";

class HerramientaService {

    getAllHerramientas() {
        return axios.get(HERRAMIENTA_REST_API_BASE_URL);
    }

    
} 

export default new HerramientaService();