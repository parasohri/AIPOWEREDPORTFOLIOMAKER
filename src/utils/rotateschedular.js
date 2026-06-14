import Schedular from "../models/scheduler";
import Portfolio from "../models/portfoliomodel";
import {connect} from '../db/dbConfig'
import cron from "node-cron";
export async function rotateSchedule(userid) {
    try {
       await connect();
       const schedular = await Schedular.findOne({ userid: userid });
        if (!schedular ){
            const portfolios= await Portfolio.find({ userid: userid });
            schedular=await Schedular.create({ userid: userid, order:portfolios.map(p=>p._id.toString()) });  
          
              
        }
      cron.schedule("*/5 * * * * *", async () => {
 
        const schedular = await Schedular.findOne({ userid: userid });
        if (!schedular ){
            const portfolios= await Portfolio.find({ userid: userid });
            schedular=await Schedular.create({ userid: userid, order:portfolios.map(p=>p._id.toString()) });  
          
              
        }
          console.log("s",schedular);
        const newOrder = [...schedular.order];
        const firstElement = newOrder.shift();
        newOrder.push(firstElement);
        schedular.order = newOrder;
        await schedular.save();

      }) 
}catch (error) {
        console.error("Error rotating schedule:", error);
    }
}