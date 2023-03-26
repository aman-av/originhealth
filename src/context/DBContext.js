import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {setDoc,doc,getDoc,getDocs,collection, arrayUnion,updateDoc,arrayRemove } from "firebase/firestore";
const DBContext = createContext()

export const DBContextProvider = ({children}) => {

    const getAlllabels = async () => {
        let retdata=[]
        const querySnapshot = await getDocs(collection(db, "classify"));
        querySnapshot.forEach((doc) => {
            if(doc.id!='images')
                retdata.push(doc.id);
            // doc.data() is never undefined for query doc snapshots
        });
        return retdata;
    }


 const getData = async(label) => {

           const docRef = doc(db, "classify", 'images');
            const docSnap = await getDoc(docRef);

         let data = docSnap.data();
         let ret=[]
         for (const i in data)
         {
             ret.push([i]);
            }
        return ret;
    };

    
 const removableTag = async(label) => {

           const docRef = doc(db, "classify", 'images');
            const docSnap = await getDoc(docRef);

     let data = docSnap.data();
     console.log(data[label])
     return data[label];
       
    };


     const filterData = async(label) => {

           const docRef = doc(db, "classify", label);
            const docSnap = await getDoc(docRef);

         let data = docSnap.data();
        return data.label;
    };


    const createLabel = async (label) => {

        const docRef = doc(db, "classify", label);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists())  {
                const newlabel = doc(db, 'classify', label);
                setDoc(newlabel, { label: [] });
            }
    }

    const addLabeltoImage = async (imagename, label) => {
        console.log(imagename,label)
        const imageupdate = doc(db, 'classify', 'images');

        // Atomically add a new region to the "regions" array field.
        await updateDoc(imageupdate, {
            [imagename]: arrayUnion(label)
        });

         const labelupdate = doc(db, 'classify', label);
        // Atomically remove a region from the "regions" array field.
        await updateDoc(labelupdate, {
            'label': arrayUnion(imagename)
        });
    }
    
    
    const removeLabeltoImage = async (imagename,label) => {
        const imageupdate = doc(db, 'classify', 'images');

        // Atomically remove a region from the "regions" array field.
        await updateDoc(imageupdate, {
            [imagename]: arrayRemove(label)
        });

         const labelupdate = doc(db, 'classify', label);

        // Atomically remove a region from the "regions" array field.
        await updateDoc(labelupdate, {
            'label': arrayRemove(imagename)
        });
    }


    return (
        <DBContext.Provider value={{ createLabel,addLabeltoImage,removeLabeltoImage,filterData,getAlllabels,getData ,removableTag}}>
            {children}
        </DBContext.Provider>
    );
}

export const Db = () => {
    return useContext(DBContext)
}