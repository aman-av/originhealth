import React,{useState,useEffect} from "react";
import { Button,Card,Form,Row,Col,Modal } from "react-bootstrap";
import { UserAuth } from "../context/AuthContext";
import { Db } from '../context/DBContext'
import { Navigate, useNavigate } from "react-router-dom";
function Account() {

  const {getData, getAlllabels,removableTag,addLabeltoImage,removeLabeltoImage,filterData } = Db();

  const [selected, setSelected] = useState();
  
    const { user, logout } = UserAuth();
    const [images, setImages] = useState([]);
  const [addlabel, setAddlabel] = useState();
  const [removelabel, setRemovelabel] = useState();
  const [metadata,setMetadata] = useState([])
    
    const navigate = useNavigate();
    const handlelogout = async() => {
      await logout();
      console.log(user);
      navigate('/');
    }
    
  const func = async () => {
    await filterData('cat');
  }
  func();
   const [type, setType] = useState('');
   
    const [newlabel, setNewlabel] = useState('');
  const [alllabel, setAlllabel] = useState([]);
  
   const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

   const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
    
    useEffect(() => {
        callalllabel();
    }, []);
    
  const callalllabel = async () => {
    let data= await getData();
    setImages(data);
    setMetadata(data);
        setAlllabel(await getAlllabels());
    }
    const handleclick = async (e) => {
      e.preventDefault();
      console.log(type);
      setImages(await filterData(type));

  }
  const [rmlist, setRmlist] = useState([]);
  
  const rmfunc = async (e) => {
    // e.preventDefault();

    console.log(e[0])

    setRmlist(await removableTag(e[0]));
  }
  const addlabelfunc =async()=>{
    await addLabeltoImage(selected,addlabel);

  }  
  
  const removelabelfunc =async(e)=>{
      // e.preventDefault();
    await removeLabeltoImage(selected,removelabel);

  }  
  
   const resetfunc = async (e) => {

      e.preventDefault();
      setImages(await getData());

    }



      return <div style={{margin:'2% 0 0 2%'}}>
        {
          user.email === 'admin@admin.com' ?
            <Button onClick={e=>navigate('/admin')}>
                Admin page
            </Button>:<></>
    }
        <div style={{textAlign:'end'
        }}>
          
    <Button onClick={handlelogout}>Logout</Button>
        </div>
    
        <div style={{ textAlign: 'center' }}>
          
              <Form onSubmit={handleclick}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h4>
              Filter
            </h4>
            </Form.Label>
             <Form.Control
          as="select"
          value={type}
          onChange={e => {
           
            setType(e.target.value);
          }}
            >
              {
                alllabel.map(val => {
                  return <option key={val} value={val}>{val}</option>
                })
              }
        </Form.Control>
            
            {/* <Form.Control onChange={e=>setNewlabel(e.target.value)} type="text" placeholder="Enter label" /> */}
           
            <Button style={{ margin: "2% 0 3% 0" }} variant="primary" className="block" type="submit" >Filter</Button>{'  '}
             <Button style={{margin:"2% 0 3% 0"}} variant="primary" className="block" onClick={resetfunc} >Reset</Button>
        </Form.Group>
            </Form>
        <Row>
          
        {
          
          images.map(val =>
            {
            return <Col lg={4} md={6} key={val} style={{margin:'2% 0% 2% 0%'}}>
                
                 <Card style={{ width: '18rem' }}>
                  <Card.Img height='200px' width='auto' variant="top" src={require(`../images/${val}.jpg`)} />
                  <Card.Body>
                    <Card.Title>{val}</Card.Title>
                   
                  
                  <Button variant="primary" onClick={e => { setSelected(val[0]); handleShow1(e)}}>Add Label</Button>{'  '}
                  <Button variant="primary" onClick={e => {setSelected(val[0]);rmfunc(val);  handleShow2(); }}>Remove Label</Button>
                  </Card.Body>
                </Card>
                </Col>
            {/* </div> */}
            })
          }
          </Row>
        </div>
    
        

         <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Add Label</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Filter</Form.Label>
             <Form.Control
              as="select"
              value={addlabel}
              onChange={e => {
                setAddlabel(e.target.value);
              }}
                >
              {
                alllabel.map(val => {
                  return <option key={val} value={val}>{val}</option>
                })
              }
        </Form.Control>
        </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
            <Button variant="primary" onClick={e => { handleClose1(e); addlabelfunc(e); }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

              
        <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Label</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Remove Label</Form.Label>
             <Form.Control
              as="select"
              value={removelabel}
              onChange={e => {
                setRemovelabel(e.target.value);
              }}
                >
              {
                rmlist.map(val => {
                  return <option key={val} value={val}>{val}</option>
                })
              }
        </Form.Control>
        </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
            <Button variant="primary" onClick={e => { handleClose2(e); removelabelfunc(e); }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        
  </div>;
 
}

export default Account;
