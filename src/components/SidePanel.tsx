import React from "react";
import styled from "styled-components";
import { colors } from "./styles/Variables";
import { useQuery } from "@apollo/client";
import { GET_USER_GALLERIES } from "../gql/query";
import { Link, NavLink } from "react-router-dom";
import { nanoid } from 'nanoid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { ImageType } from "./Image";
export type Gallery = {
    _id: string,
    childGalleries: Gallery[],
    idPath: string,
    name: string,
    images: ImageType[]
    parentGalleryId?: string,
    path?: string,
    user?: string,
    __typename: string
}
const SidePanelStyle = styled.section`
max-width:300px;
min-width:300px;

height:calc(100vh - 150px);
border-right: 3px solid ${colors.color2};
overflow-y:scroll;

@media(max-width:800px){
    max-width:100%;
    border-right:0;
    display:none;
}

ul {
    list-style-type:none;
    margin-left:20px;
    padding-left:0;
    li {
        svg {
            font-size:2.5rem;
            cursor:pointer;
            &:hover{
                color:${colors.white}
            }
        }
    }
}

a {
    color:${colors.fontMain};
    text-decoration:none;
    margin-left:5px;

    &:hover{
        color:${colors.white};
    }
}
`
const LinkElement = styled.div`
    display:flex;
    align-items:center;
`

function SidePanel() {
    const { data: galleryList } = useQuery<{ userGalleries: string }>(GET_USER_GALLERIES)
    const [linkState, setLinkState] = React.useState<{ [key: string]: boolean }>({})

    const galleryLoop = (gallery: Gallery) => {
        if (!gallery.childGalleries || gallery.childGalleries.length === 0) {
            return <li key={nanoid()}>
                <Link to={`/galleries/${gallery._id}`} style={{ marginLeft: '14px' }}>{gallery.name}</Link>
            </li>
        }

        if (gallery.childGalleries.length > 0) {
            return (
                <li key={nanoid()}>
                    <LinkElement>
                        {linkState[gallery._id] &&
                            <FontAwesomeIcon style={{ marginLeft: '-6px' }} onClick={() => setLinkState({ ...linkState, [gallery._id]: !linkState[gallery._id] })} icon={faCaretDown} />
                        }
                        {!linkState[gallery._id] &&
                            <FontAwesomeIcon onClick={() => setLinkState({ ...linkState, [gallery._id]: !linkState[gallery._id] })} icon={faCaretRight} />
                        }
                        <NavLink key={nanoid()} to={`/galleries/${gallery._id}`}>{gallery.name}</NavLink>
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
                </li>
            )
        }
    }

    return (
        <SidePanelStyle>
            <ul>
                {
                    galleryList?.userGalleries &&
                    JSON.parse(galleryList.userGalleries).map((gallery: Gallery) => {
                        return galleryLoop(gallery)
                    })
                }
            </ul>
        </SidePanelStyle>
    )
}

export default SidePanel