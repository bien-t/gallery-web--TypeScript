import { gql } from '@apollo/client'


const GET_GALLERY_INFO = gql`
  query galleryInfo($id:ID) {
    galleryInfo(_id:$id){
    _id
    name
    path
    idPath
    images {
      _id
      mime
      miniatureImage
      name
    }

    childGalleries {
      _id
      name
      path
    }
    }
  }
`

const GET_USER_GALLERIES = gql`
  query userGalleries{
    userGalleries
  }
`

export {
  GET_GALLERY_INFO,
  GET_USER_GALLERIES,
}