import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { userContext } from '../App';
import back from './back.jpg';

function Feed() {
    const [data, setData] = useState([])
    const history = useHistory()
    const { state, dispatch } = useContext(userContext)
    const [mypost, setPost] = useState([])

    useEffect(() => {
        fetch("/feed", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "token " + localStorage.getItem("jwt"),
            }
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setData(result)
            })
    }, [])

    return (
        <div>
            <div>
                <div style={{ position: "absolute", top: "120px", padding: "0px 30px"}}>
                    <h1>Everyblog</h1>
                    <h3 style={{ fontSize: "18px" }}>Everyblog is an online platform to share their knowledge,thoughts, feeling with everyone.</h3>
                </div>

                <img style={{ width: "100%", height: "450px", objectFit: "cover" }} src={back} alt="" />
            </div>

            <div className="gen-feed">
                {
                    data.map(item => {
                        return (
                                <div className="post-card" key={item._id} style={{ backgroundColor: "whitesmoke" }}>
                                    <div className="container" >
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                                <div className="card post-neu" style={{ borderRadius: "20px 20px 20px 20px" }}>
                                                    <img className="card-img" style={{ height: "230px", borderRadius: " 20px 20px 0px 0px" }} src={item.image ? item.image : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBggIBxIQEAcIDQoGCQkGEBIICg0NIB0iFhUdHx8YHiggGCYlGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKoAqgMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAABAUGAwIB/8QAMRAAAgECAgcHBAIDAAAAAAAAAAIDAVIEFAUREjIzkqITFSEicoLBNEJzsmKxIzHR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJOAwlcVLq/1Gu8wEYGhXBQqurYp7/OespFYnKBnAaPKRWJyjKRWJygZwGjykVicoykVicoGcBo8pFYnKMpFYnKBnAaPKRWJyjKRWJygZwGjykVicoykVicoGcBo8pFYnKQdI6PVY2kgpq2d6MCqAAAAAAAALnQnBk9XwUxc6E4Enq+AI2mJWXErRa1ouynlQhdq11eYl6a+rX0IcsBhq4qXV/qNd5gOPatdXmHatdXmNBHhI0XUqU9TrtscMXo5JY2rFTZk+3Y3WApu1a6vMO1a6vMeGWqtstvKAPfatdXmHatdXmPAA99q11eYdq11eY8AD32rXV5h2rXV5jwAPfbNdXmNI3miba+5TMGnbhe0DMAAAAAAAAFzoTgSer4KYudCcCT1fAETTX1a+hCXoPV2El218ETTX1a+hDlgMXXCy7TeMbbygaEHKPExyrrRqEbF6QSBWoldqb7VTdArNI6s7Ns3EYM1WZmbxZt4AACdo/A1xLbb+EK9QHnAYGuJ87+EN1xyxeGbDSbD7v2tcaJVoq7K+Cruqc54VnjZHp5f1AzQO+LwzYaTYfd+1rjgANO3C9pmDTtwvaBmAAAAAAAAC50JwJPV8FMXOhOBJ6vgCJpr6tfxp8kEnaa+rX8af3UggAfVWrsqJTWzbql7gsCsEfnptSSb3/AKEE7SGBrhm208YW6Ro7A1nbtJfCL9gGj8DWdu1l8IV6i7VaKupfBVCrRV1L4Kp9AAADlPCs8bI9PL+pQ4vDNhpNh937WuNGcp4VnjZHp5f1AzRp24XtMwaduF7QMwAAAAAAAAXOhOBJ6vgpi50JwJPV8ARNNfVr+NP7qQlWrsqJTWzbqk3TX1a/jT+6kvQsS9k0mr/JtbG1/EDrgMFTDLrbxmbea0mAAfGWjLst4q28oVaKupfBVPoAAAAAAAAAyrbxp24XtMw28aduF7QMwAAAAAAAAXOhOBJ6vgpi50G3+KSn8gImmvq1/Gn91O+i8THFhtUrUo20/lGlMNJLOrxLrXZ2CHkZrK9IFznob1GehvUpsjNZXpGRmsr0gXOehvUZ6G9SmyM1lekZGayvSBc56G9Rnob1KbIzWV6RkZrK9IFznob1GehvUpsjNZXpGRmsr0gXOehvUZ6G9SmyM1lekZGayoEY07cL2lDkZrKl9J5YW2vtUDMAAAAAAAAHfCYpsLLtr4q28pwAF4uk4WXW1a0a11PXeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WIeP0j2sbRweEbbzP9xWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="} alt="Bologna" />

                                                    <div className="card-body">
                                                        <h4 className="card-title">{item.title}</h4>
                                                        <small className="text-muted cat">
                                    Posted by <Link to={'/user/'+item.author._id}>{item.author?item.author.name:"Unknown user"}</Link>
                                </small>
                                                        <p className="card-text">{item.tag}</p>
                                                        <small className="text-muted cat">
                                                            <Link to={'/post/' + item._id} style={{ backgroundColor: "rgb(67 67 67)", color: "whitesmoke", border: "none" }} className="btn-neu btn btn-info">&nbsp; See full story</Link>
                                                        </small>
                                                    </div>
                                                    <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                                                        <div className="views">
                                                            <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp; {item.date}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Feed;
