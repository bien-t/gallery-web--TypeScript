import React from "react";
import styled from "styled-components";
import { Form, TopBar, BottomBar, ButtonGeneral, SubmitButton, Label, Input } from './styles/Styles'

interface Props {
    onSubmit: (event: React.FormEvent) => Promise<void>
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    imageUploadCloseForm: (event: React.MouseEvent) => void
    images: (File | null)[]
    setImages: (images: (File | null)[]) => void

}

const GalleryButton = styled(ButtonGeneral)`
    padding: 5px 10px;
`
const GalleryFormTopBar = styled(TopBar)`
    width:400px;
`

const GalleryFormBottomBar = styled(BottomBar)`
    width:400px;
`
const GalleryFormContent = styled(Form)`
    display:grid;
    width:400px;
    max-height:600px;

    label,input[type=file] {
        justify-self:center;
    }
`

const Scroll = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    overflow-y:scroll;
    row-gap:10px;
`
const GalleryFormContainer = styled.div`
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background-color:rgba(30,30,30,0.7);
    display:flex;
    justify-content:center;
    z-index:1;
`

const GalleryFormCloseButton = styled(GalleryButton)`
    display:flex;
    align-items:center;
    justify-content:center;
    margin: -10px -10px 0 auto;
    font-size:2rem;
`
const ImageContainer = styled.div`
    width:90%;
    align-self:center;
`

const ImageInputWrapper = styled.div`
    display:flex;
    width:100%;
`
const ImageInput = styled(Input)`
    width:75%;
    margin-left:10px;
`

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    max-width:400px;
    padding-top:5%;
`

const ImageInfo = styled.div`
    display:flex;
    align-items:center;
    width:100%;

    span {
        overflow:hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        margin-right:5px;
    }

    button:nth-of-type(1){
        margin-left:auto;
        margin-right:5px;
    }
`
const Submit = styled(SubmitButton)`
    justify-self:center;
`

function ImageForm({ onSubmit, onChange, imageUploadCloseForm, images, setImages }: Props) {
    const [showInput, setShowInput] = React.useState<{ [key: string]: boolean }>({})
    const [imageName, setImageName] = React.useState<{ [key: string]: string }>({})

    const showInputField = (event: React.MouseEvent) => {
        event.preventDefault()
        setShowInput({
            ...showInput,
            [(event.target as HTMLButtonElement).attributes.getNamedItem('data-id')!.value]: !showInput[(event.target as HTMLButtonElement).attributes.getNamedItem('data-id')!.value]
        })
    }

    const updateName = (name: string, index: number) => (event: React.MouseEvent) => {
        event.preventDefault()
        const imagesCopy = [...images]

        const image = images[index]
        const newName = imageName[`file-${index}`] ? imageName[`file-${index}`] : name
        let newImage = null
        if (image !== null) {

            newImage = new File([image], newName, {
                type: image.type
            })
        }

        imagesCopy.splice(index, 1, newImage)

        setImages([
            ...imagesCopy
        ])
        setShowInput({
            ...showInput,
            [`file-${index}`]: false
        })
    }
    const update = (event: React.ChangeEvent) => {
        setImageName({
            ...imageName,
            [(event.target as HTMLButtonElement).attributes.getNamedItem('data-id')!.value]: (event.target as HTMLButtonElement).value
        })
    }

    const remove = (index: number) => (event: React.MouseEvent) => {
        event.preventDefault();
        const imagesCopy = [...images]
        imagesCopy.splice(index, 1)
        setShowInput({})
        setImageName({})
        setImages([
            ...imagesCopy
        ])

    }
    return (
        <GalleryFormContainer>
            <Wrapper>
                <GalleryFormTopBar>
                    <GalleryFormCloseButton type='button' width={30} height={30} onClick={imageUploadCloseForm}>X</GalleryFormCloseButton>
                </GalleryFormTopBar>
                <GalleryFormContent onSubmit={onSubmit}>
                    <h2>Image details</h2>
                    <Label htmlFor="files">Select files:</Label>
                    <Input type="file" name="files" id="files" accept="image/png, image/jpeg" multiple onChange={onChange} />
                    <Scroll>
                        {
                            images &&
                            images.map((image, index) => {
                                return (
                                    <ImageContainer key={`image-${index}`}>
                                        {
                                            !(showInput && showInput[`file-${index}`]) &&
                                            <ImageInfo>
                                                <span>{image!.name}</span>
                                                <GalleryButton type='button' data-name={image!.name} data-id={`file-${index}`} onClick={showInputField}>Rename</GalleryButton>
                                                <GalleryButton type='button' onClick={remove(index)}>Remove</GalleryButton>
                                            </ImageInfo>
                                        }
                                        {
                                            (showInput && showInput[`file-${index}`]) &&
                                            <ImageInputWrapper>
                                                <Label>Name:<ImageInput type="text" placeholder={image!.name} data-id={`file-${index}`} onChange={update} /></Label>
                                                <GalleryButton type='button' onClick={updateName(image!.name, index)}>Update</GalleryButton>
                                            </ImageInputWrapper>
                                        }
                                    </ImageContainer>
                                )
                            })
                        }
                    </Scroll>
                    <Submit type='submit'>ADD</Submit>
                </GalleryFormContent>
                <GalleryFormBottomBar />
            </Wrapper>
        </GalleryFormContainer>
    )
}

export default ImageForm