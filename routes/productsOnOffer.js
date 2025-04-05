import { PrismaClient } from "@prisma/client";
import { Router } from "express";
const prisma = new PrismaClient()

const router2 = Router()
router2.route('/products')
.get(async(req, res) => {
    const productsOnoffer = await prisma.products.findMany({
        where:{
            isOnOffer:true
        }
    });
    if(productsOnoffer){
        res.send({
            message:"product on Offer",
            data:productsOnoffer
        })
    }
})

export default router2