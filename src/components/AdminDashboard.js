import React,{useState,useEffect} from "react";
import { Button, Form,Table } from "react-bootstrap";
import { Db } from '../context/DBContext';
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const { createLabel,getAlllabels } = Db();
    const [newlabel, setNewlabel] = useState('');
    const [alllabel, setAlllabel] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        callalllabel();
    }, []);
    
    const callalllabel = async () => {
        setAlllabel(await getAlllabels());
    }
    const handleclick = async (e) => {

        e.preventDefault();
        await createLabel(newlabel);
        setNewlabel('');
        callalllabel();
    }

    return <div style={{ margin: '20% 20% 20% 20%' }}>
        <div className="d-grid gap-2">

         <Form onSubmit={handleclick}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Add New Label</Form.Label>
            <Form.Control onChange={e=>setNewlabel(e.target.value)} type="text" placeholder="Enter label" />
           
            <Button style={{margin:"5% 0 5% 0"}} variant="primary" className="block" type="submit" >Create Label</Button>{'  '}
            <Button style={{margin:"5% 0 5% 0"}} variant="primary" className="block" onClick={e=>navigate('/dashboard')} >Go to Dashboard</Button>
        </Form.Group>
            </Form>
            
                <Table  striped bordered hover variant="" style={{textAlign:'center'}}>
                  {/* <th>S. No</th> */}
                <th>Label</th>
                <tbody>
                {
                        alllabel.map(ele =>
                        {
                            return (
                                // <tr></tr>
                                <tr key={ele}><div>
                                    {ele}
                                </div>
                                </tr>
                            );
                        }
                        )    
                    
                }
                </tbody>
            </Table>
            
        </div>
  </div>;
}

export default AdminDashboard;
