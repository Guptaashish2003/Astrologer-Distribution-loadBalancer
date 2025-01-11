const Astrologer = require("../models/astrologer");
import { Document } from "mongoose";
interface IAstrologer extends Document {
    name: string;
    experience: number;
    rating: number;
    connection: number;
    assignedUser: string[];
    save: () => Promise<this>;
    
  }
  
  interface IUser extends Document {
    name: string;
    email: string;
    _id: string;
    assignedAstrologer?: string;
    save: () => Promise<this>;
  }

export async function assignUserToAstrologer(user: IUser): Promise<IAstrologer | null> {
    console.log(`Assigning user ${user.name} to an astrologer...`);
    const astrologers = await Astrologer.find();
    // console.log(astrologers);
  
    let selectedAstrologer: IAstrologer | null = null as IAstrologer | null;
    let minEffectiveLoad = Infinity;
  
    // Find astrologer with the lowest effective load
    astrologers.forEach((astrologer: IAstrologer) => {
        console.log("astrologer",astrologer);
      const effectiveLoad: any = astrologer.connection / astrologer.rating;
      console.log("effectiveLoad",effectiveLoad,"minEffectiveLoad",minEffectiveLoad);
      console.log("check true false",effectiveLoad < minEffectiveLoad);
      
      if (effectiveLoad < minEffectiveLoad) {
        minEffectiveLoad = effectiveLoad;
        console.log("astrologer....",astrologer)
        selectedAstrologer = astrologer;
      }
      
    });
    console.log("selectedAstrologer,",selectedAstrologer);
  
    if (selectedAstrologer) {
      // Update the selected astrologer's connections and assigned users
      console.log(`Assigning user ${user.name} to astrologer ${selectedAstrologer.name}`);
      selectedAstrologer.connection += 1;
      selectedAstrologer.assignedUser.push(user._id);
      await selectedAstrologer.save();
  
      // Update the user with the assigned astrologer
      user.assignedAstrologer = selectedAstrologer.name;
      await user.save();
    }
    console.log("selecteduser////////",selectedAstrologer);
  
    return selectedAstrologer;
  }

