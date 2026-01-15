import { getAllService } from "../../services/category-service.js"
import { categoryListResponseDTO } from "./category-dto.js"

export const getAllController = async (req, res, next) => {
    try{
        const categories = await getAllService()
        res.status(200).json({
            status: "success",
            data: categoryListResponseDTO(categories)
        })
    } catch(error){
        next(error)
    }
}