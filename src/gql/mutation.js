import { gql } from '@apollo/client'

const USER_CREATE = gql`
    mutation userCreate($input:UserCreateInput!){
        userCreate(input:$input){
            user {
                _id
            }
            errors {
                message
            }
        }
    }
`

const USER_LOGIN = gql`
    mutation userLogin($input:UserLoginInput!){
        userLogin(input:$input){
            user {
                _id
            }
            errors {
                message
            }
        }
    }
`

const GALLERY_ADD = gql`
    mutation galleryAdd($input:GalleryInput!){
        galleryAdd(input:$input){
            gallery{
                _id
                name
            }
            errors {
                message
            }
        }
    }
`

const IMAGE_ADD = gql`
    mutation imageAdd($upload:Upload!,$galleryId:ID!){
        imageAdd(Upload:$upload,galleryId:$galleryId){
            image {
                name
                galleryId
            }
            errors {
                message
            }
        }
    }
`

const IMAGE_RENAME = gql`
    mutation imageRename($name:String!,$id:ID!){
        imageRename(name:$name,id:$id){
            errors {
                message
            }
        }
    }
`

const IMAGE_DELETE = gql`
    mutation imageDelete($id:ID!){
        imageDelete(id:$id){
            errors {
                message
            }
        }
    }
`

const IMAGE_MOVE = gql`
    mutation imageMove($id:ID!,$newGallery:ID!){
        imageMove(id:$id,newGallery:$newGallery){
            errors {
                message
            }
        }
    }
`

const GALLERY_RENAME = gql`
    mutation galleryRename($name:String!,$id:ID!){
        galleryRename(name:$name,id:$id){
            errors {
                message
            }
        }
    }
`
const GALLERY_DELETE = gql`
    mutation galleryDelete($id:ID!){
        galleryDelete(id:$id){
            errors {
                message
            }
        }
    }
`
const MULTIPLE_UPLOAD_MUTATION = gql`
  mutation multipleUpload($files: [Upload],$galleryId:ID) {
    imageAdd(images: $files,galleryId:$galleryId){
        image {
            _id
        }
        errors {
            message
        }
    }
  }
`
const LOG_OUT = gql`
mutation Logout{
    logout
}
`
export {
    USER_CREATE,
    USER_LOGIN,
    LOG_OUT,
    GALLERY_ADD,
    IMAGE_ADD,
    IMAGE_RENAME,
    MULTIPLE_UPLOAD_MUTATION,
    IMAGE_DELETE,
    IMAGE_MOVE,
    GALLERY_RENAME,
    GALLERY_DELETE
}