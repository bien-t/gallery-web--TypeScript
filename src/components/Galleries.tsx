import React from 'react'
import styled from 'styled-components'
import { ButtonGeneral, Label, Input } from './styles/Styles'
import { colors } from './styles/Variables'
import { useQuery, useMutation } from '@apollo/client'
import { GET_GALLERY_INFO, GET_USER_GALLERIES } from '../gql/query'
import { GALLERY_ADD, IMAGE_RENAME, MULTIPLE_UPLOAD_MUTATION, IMAGE_DELETE, IMAGE_MOVE, GALLERY_RENAME, GALLERY_DELETE } from '../gql/mutation'
import { nanoid } from 'nanoid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'

import Path from "./Path";
import GalleryForm from './GalleryForm'
import GalleryDetails from './GalleryDetails'
import ImageForm from './ImageForm'
import Image from './Image'
import ImageSlider from './ImageSlider'
import ContextMenu from './ContextMenu'

import { Gallery } from './SidePanel'

const GalleryButton = styled(ButtonGeneral)`
    margin-left:15px;
    margin-top:5px;
`
const GalleryContainer = styled.div`
    display:grid;
    grid-template-columns:repeat(auto-fit,180px);
    grid-template-rows: repeat(auto-fit,160px);
    gap:15px;
    overflow-y:scroll;
    overflow-x:hidden;
    height:calc(100% - 70px);
    margin-top:15px;
    padding-left:15px;
    @media(max-width:800px){
        justify-content:center;
    }
    `

const LinkElement = styled.li`
    display:flex;
    align-items:center;
    padding:5px;
    div {
        width:99%;
    }

    input[type="radio"]{
        margin-left:auto;
        margin-right:2px;
    }
`
const MoveContainer = styled.div`
    overflow-y:scroll;
    max-height:500px;
`
const MoveList = styled.ul`
    border-radius:5px;
    padding:0;
    margin:0 auto;
    display:flex;
    flex-direction:column;
    list-style-type:none;
    width:90%;
    background-color:${colors.color3};

    &:hover{
        background-color:${colors.color1};
        color:${colors.white};
    }

    ul {
        list-style-type:none;
        padding:0;
        margin:0;
        color:${colors.fontMain};
    li {
        display:flex;
        background-color:${colors.color3};
        padding:2px;

        &:hover{
            background-color:${colors.color1};
            color:${colors.white};

        }

        input[type="radio"]{
            margin-left:auto;
            margin-right:5px;
        }
    }

    label:hover {
        cursor:pointer;
    }
`

const Span = styled.span`
text-align:center;
margin: auto 0;
padding: 0 15px;
font-weight:bold;
`

type Context = {
    id?: string,
    typename?: string,
    name?: string
}

const useContextClick = () => {
    const [showContext, setShowContext] = React.useState(false)
    const [position, setPosition] = React.useState({} as { x: number, y: number })
    const [contextDetails, setContextDetails] = React.useState<Context>({})
    const handleClick = (id: string, typename: string) => (event: React.MouseEvent) => {
        setContextDetails({ id: id, typename: typename })
        event.preventDefault()
        if (event.pageX + 150 > window.innerWidth) {
            event.pageX = window.innerWidth - 150
        }
        setPosition({ x: event.pageX, y: event.pageY })
        setShowContext(true)
        document.addEventListener("click", () => {
            setShowContext(false)
        });

    }
    return { showContext, position, contextDetails, setContextDetails, handleClick }
}

const apiServer = process.env.API_SERVER || 'http://localhost:4000'


function Galleries() {

    /*Galleries*/
    const params = useParams()
    const { loading, error, data } = useQuery(GET_GALLERY_INFO, { variables: { id: params.id } })



    /*Gallery Add Form*/
    const [showGalleryAddForm, setShowGalleryAddForm] = React.useState(false)
    const [galleryAddDetails, setGalleryAddDetails] = React.useState({ name: '', parentGalleryId: '' })
    const [galleryAdd] = useMutation(GALLERY_ADD, {
        refetchQueries: [
            GET_GALLERY_INFO,
            'userGalleries'
        ]
    })

    const galleryAddOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGalleryAddDetails({
            ...galleryAddDetails,
            [event.target.name]: event.target.value,
        })
    }

    const handleGalleryAdd = async (event: React.FormEvent) => {
        event.preventDefault()
        await galleryAdd({
            variables: {
                input: {
                    name: galleryAddDetails.name,
                    path: galleryAddDetails.name || 'root/',
                    parentGalleryId: data.galleryInfo[0]._id
                }
            }
        })
        setShowGalleryAddForm(false)
    }
    /*Gallery Add Form*/

    /*Image Upload*/
    const [showUploadImagesForm, setShowUploadImagesForm] = React.useState(false)
    const [uploadImages, setUploadImages] = React.useState<(File | null)[]>([])
    const [multipleUploadMutation] = useMutation(MULTIPLE_UPLOAD_MUTATION, {
        refetchQueries: [
            GET_GALLERY_INFO,
            'userGalleries'
        ]
    })

    const imageUploadSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault()
        await multipleUploadMutation({
            variables: {
                files: uploadImages,
                galleryId: data.galleryInfo[0]._id,
            }
        })
        setShowUploadImagesForm(false)
        setUploadImages([])
    }

    const imageUploadCloseForm = (event: React.MouseEvent) => {
        event.preventDefault()
        setShowUploadImagesForm(false)
        setUploadImages([])
    }

    const imageUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        let imageArray = []
        for (let i = 0; i <= event.target.files!.length - 1; i++) {
            imageArray.push(event.target.files!.item(i))
        }

        setUploadImages([
            ...uploadImages,
            ...imageArray
        ])
    }
    /*Image Upload*/

    /*Image Slider*/
    type Url = {
        url: string,
        index: number
    }
    const [showImageSlider, setShowImageSlider] = React.useState(false)
    const [imageUrlArray, setImageUrlArray] = React.useState({} as Url)

    const getImage = async (imageId: string) => {
        const userId = localStorage.getItem('id')
        try {
            let response = await fetch(`${apiServer}/image/${userId}/${imageId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'image/*',

                },
                credentials: 'include'
            })
            return response
        } catch (err) {
            console.log(err)
        }
    }

    const imageClick = async (imageId: string, imageIndex: number) => {
        getImage(imageId).then((data) => {
            setShowImageSlider(true)
            setImageUrlArray({ url: data!.url, index: imageIndex })
        })
    }

    const nextClick = async (index: number) => {
        if (index + 1 > data.galleryInfo[0].images.length - 1) {
            index = 0;
        } else {
            index++;
        }
        const imageId = data.galleryInfo[0].images[index]._id
        getImage(imageId).then((data) => {
            setImageUrlArray({ url: data!.url, index: index })
        })
    }

    const prevClick = async (index: number) => {
        if (index - 1 < 0) {
            index = data.galleryInfo[0].images.length - 1;
        } else {
            index--;
        }
        const imageId = data.galleryInfo[0].images[index]._id
        getImage(imageId).then((data) => {
            setImageUrlArray({ url: data!.url, index: index })
        })
    }
    /*Image Slider*/

    /*Context Menu*/
    const contextMenu = useContextClick()
    const renameContextOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        contextMenu.setContextDetails({
            ...contextMenu.contextDetails,
            [event.target.name]: event.target.value,
        })
    }
    /*Image Context Menu*/
    const [showImageRenameForm, setShowImageRenameForm] = React.useState(false)
    const [showImageMoveToForm, setShowImageMoveToForm] = React.useState(false)
    const [moveToDetails, setMoveToDetails] = React.useState({})
    const [linkState, setLinkState] = React.useState<{ [key: string]: boolean }>({})

    const { data: galleryList } = useQuery(GET_USER_GALLERIES)

    const [imageRename] = useMutation(IMAGE_RENAME, {
        refetchQueries: [
            GET_GALLERY_INFO,
            'userGalleries'
        ]
    })

    const [imageDelete] = useMutation(IMAGE_DELETE, {
        refetchQueries: [
            GET_GALLERY_INFO,
            'userGalleries'
        ]
    })
    const [imageMove] = useMutation(IMAGE_MOVE, {
        refetchQueries: [
            GET_GALLERY_INFO,
            'userGalleries'
        ]
    })

    const handleImageRename = async (event: React.FormEvent) => {
        event.preventDefault()
        await imageRename({
            variables: {
                name: contextMenu.contextDetails.name,
                id: contextMenu.contextDetails.id
            }
        })
        setShowImageRenameForm(false)
        contextMenu.setContextDetails({})
    }

    const handleImageDelete = async () => {
        await imageDelete({
            variables: {
                id: contextMenu.contextDetails.id
            }
        })
    }

    const changeLinkState = (gallery: Gallery) => {
        const idArray = gallery.idPath.split('/')
        setLinkState(state => {
            if (linkState[gallery._id] === true) {
                state[gallery._id] = false
            } else {
                state = {}
                idArray.forEach(element => {
                    state[element] = true
                });
            }

            return {
                ...state
            }
        })
    }

    const selectNewGallery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMoveToDetails(event.target.value)
    }

    const moveToSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        await imageMove({
            variables: {
                id: contextMenu.contextDetails.id,
                newGallery: moveToDetails,
            }
        })
        setLinkState({})
        setShowImageMoveToForm(false)
        setMoveToDetails({})
    }

    const moveToCloseform = () => {
        setLinkState({})
        setShowImageMoveToForm(false)
        setMoveToDetails({})

    }

    const galleryLoop = (gallery: Gallery) => {
        if (!gallery.childGalleries || gallery.childGalleries.length === 0) {
            return <li key={nanoid()} style={{ paddingLeft: '8px' }}>
                <label htmlFor={gallery._id}>{gallery.name}</label>
                <input type="radio" name='galleryId' id={gallery._id} value={gallery._id} onChange={selectNewGallery} checked={moveToDetails === gallery._id} />
            </li>
        }

        if (gallery.childGalleries.length > 0) {
            return (
                <div key={nanoid()}>
                    <LinkElement key={nanoid()} >
                        <div onClick={() => changeLinkState(gallery)} style={{ cursor: 'pointer' }} >
                            {linkState[gallery._id] &&
                                <FontAwesomeIcon icon={faCaretDown} />
                            }

                            {!linkState[gallery._id] &&
                                <FontAwesomeIcon icon={faCaretRight} />
                            }
                            <label htmlFor={gallery._id}>{gallery.name}</label>
                        </div>
                        <input type="radio" name='galleryId' id={gallery._id} value={gallery._id} onChange={selectNewGallery} checked={moveToDetails === gallery._id} />
                    </LinkElement>

                    {linkState[gallery._id] &&
                        <ul
                            key={nanoid()}>
                            {gallery.childGalleries.map((child) => {
                                return galleryLoop(child)
                            })
                            }
                        </ul>
                    }
                </div>
            )
        }
    }

    const saveAs = async () => {
        const userId = localStorage.getItem('id')
        try {
            let response = await fetch(`${apiServer}/save/${userId}/${contextMenu.contextDetails.id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'image/*',
                },
                credentials: 'include'
            })
            window.open(response.url)

        } catch (err) {
            console.log(err)
        }
    }
    /*Image Context Menu*/

    /*Gallery Context Menu*/
    const [showGalleryRenameForm, setShowGalleryRenameForm] = React.useState(false)
    const [showGalleryDeleteMessage, setShowGalleryDeleteMessage] = React.useState(false)
    const [galleryRename] = useMutation(GALLERY_RENAME, {
        refetchQueries: [
            GET_GALLERY_INFO,
            'userGalleries'
        ]
    })

    const [galleryDelete] = useMutation(GALLERY_DELETE, {
        refetchQueries: [
            GET_GALLERY_INFO,
            'userGalleries'
        ]
    })

    const handleGalleryRename = async (event: React.FormEvent) => {
        event.preventDefault()
        await galleryRename({
            variables: {
                name: contextMenu.contextDetails.name,
                id: contextMenu.contextDetails.id
            }
        })
        setShowGalleryRenameForm(false)
        contextMenu.setContextDetails({})
    }

    const handleGalleryDelete = async (event: React.FormEvent) => {
        event.preventDefault()
        await galleryDelete({
            variables: {
                id: contextMenu.contextDetails.id
            }
        })
        setShowGalleryDeleteMessage(false)
    }
    /*Gallery Context Menu*/
    /*Context Menu*/

    return (
        <>
            {data &&
                <Path path={data.galleryInfo[0]?.path} id={data.galleryInfo[0]?.idPath} />
            }

            <GalleryButton width={100} height={30} onClick={() => setShowGalleryAddForm(true)}> New Gallery</GalleryButton>
            <GalleryButton width={150} height={30} onClick={() => setShowUploadImagesForm(true)}> Upload images</GalleryButton>

            {showGalleryAddForm &&
                <GalleryForm onSubmit={handleGalleryAdd} close={() => setShowGalleryAddForm(false)} buttonText={'Add'}>
                    <h2>Add gallery</h2>
                    <Label htmlFor="name">Name:</Label>
                    <Input type="text" name="name" id="name" placeholder="Gallery name" required onChange={galleryAddOnChange} />
                </GalleryForm>
            }

            {showUploadImagesForm &&
                <ImageForm onSubmit={imageUploadSubmitForm} imageUploadCloseForm={imageUploadCloseForm} onChange={imageUploadChange} images={uploadImages} setImages={setUploadImages} />
            }
            <GalleryContainer >
                {
                    data &&
                    data.galleryInfo.map((gallery: Gallery) => {
                        const children = gallery.childGalleries.map((child, index) => {
                            return (
                                <GalleryDetails key={`child-${index}`} child={child} contextClick={contextMenu.handleClick} />
                            )
                        })

                        const images = gallery.images.map((image, index) => {
                            return (
                                <Image key={`image-${index}`} image={image} index={index} imageClick={imageClick} contextClick={contextMenu.handleClick} />
                            )
                        })
                        return [...children, ...images]
                    })
                }

                {
                    showImageSlider &&
                    <ImageSlider image={imageUrlArray} setSlider={setShowImageSlider} nextClick={nextClick} prevClick={prevClick} />
                }

                {
                    contextMenu.showContext &&
                    <ContextMenu position={contextMenu.position}>
                        {contextMenu.contextDetails.typename === 'Image' &&
                            <ul>
                                <li onClick={() => setShowImageRenameForm(true)}>Rename</li>
                                <li onClick={handleImageDelete}>Delete</li>
                                <li onClick={() => setShowImageMoveToForm(true)}>Move to</li>
                                <li onClick={saveAs}>Save</li>
                            </ul>
                        }

                        {contextMenu.contextDetails.typename === 'Gallery' &&
                            <ul>
                                <li onClick={() => setShowGalleryRenameForm(true)}>Rename</li>
                                <li onClick={() => setShowGalleryDeleteMessage(true)}>Delete</li>
                            </ul>
                        }
                    </ContextMenu>
                }

                {
                    showGalleryDeleteMessage &&
                    <GalleryForm onSubmit={handleGalleryDelete} close={() => setShowGalleryDeleteMessage(false)} buttonText={'Confirm'}>
                        <Span>This action will delete all sub-galleries and images. Are you sure?</Span>
                    </GalleryForm>

                }

                {
                    showImageRenameForm &&
                    <GalleryForm onSubmit={handleImageRename} close={() => setShowImageRenameForm(false)} buttonText={'Change'}>
                        <h2>Rename picture</h2>
                        <Label htmlFor="name">Name:</Label>
                        <Input type="text" name="name" id="imageName" placeholder="Image name" required onChange={renameContextOnChange} />
                    </GalleryForm>
                }

                {
                    showGalleryRenameForm &&
                    <GalleryForm onSubmit={handleGalleryRename} close={() => setShowGalleryRenameForm(false)} buttonText={'Change'}>
                        <h2>Rename gallery</h2>
                        <Label htmlFor="name">Name:</Label>
                        <Input type="text" name="name" id="galleryName" placeholder="Gallery name" required onChange={renameContextOnChange} />
                    </GalleryForm>
                }

                {showImageMoveToForm &&
                    <GalleryForm onSubmit={moveToSubmit} buttonText={'Move'} close={() => moveToCloseform()}>
                        <h2>Move to</h2>
                        <MoveContainer>

                            <MoveList>
                                {
                                    galleryList?.userGalleries &&
                                    JSON.parse(galleryList.userGalleries).map((gallery: Gallery) => {
                                        return galleryLoop(gallery)
                                    })
                                }
                            </MoveList>
                        </MoveContainer>
                    </GalleryForm>
                }

            </GalleryContainer>

        </>
    )
}

export default Galleries