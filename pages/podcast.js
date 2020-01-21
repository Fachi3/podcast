import 'isomorphic-fetch'
import Link from 'next/link'

export default class extends React.Component{

    static async getInitialProps({query}){
        let idPodcast = query.id
        let req = await fetch(`https://api.audioboom.com/audio_clips/${idPodcast}.mp3`)
        let {body : audio_clip} = await req.json()
        let audio_clip_obj = audio_clip.audio_clip
        return {audio_clip_obj}
    }

    render(){
        const {audio_clip_obj} = this.props
        console.log(audio_clip_obj.title)

        return <div>
            <header>Podcast</header>

            <div className='modal'>
                <div className='clip'>
                    <nav>
                    <Link href={`/channel?id=${audio_clip_obj.channel.id}`}>
                        <a className='close'>&lt; Volver</a>
                    </Link>
                    </nav>

                    <picture>
                    {/* Hint: Puede estar en clip.urls.image o en clip.channel.urls.logo_image.original */}
                    <div style={{ backgroundImage: `url(${audio_clip_obj.urls.image})` }} />
                    </picture>

                    <div className='player'>
                    <h3>{audio_clip_obj.title}</h3>
                    <h6>{audio_clip_obj.channel.title}</h6>
                    <audio controls autoPlay={true}>
                        <source src={audio_clip_obj.urls.high_mp3} type='audio/mpeg' />
                    </audio>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                nav {
                    background: none;
                }
                nav a {
                    display: inline-block;
                    padding: 15px;
                    color: white;
                    cursor: pointer;
                    text-decoration: none;
                }
                .clip {
                    display: flex;
                    height: 100%;
                    flex-direction: column;
                    background: #8756ca;
                    color: white;
                }
                picture {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: 1 1;
                    flex-direction: column;
                    width: auto;
                    padding: 10%;
                }
                picture div {
                    width: 100%;
                    height: 100%;
                    background-position: 50% 50%;
                    background-size: contain;
                    background-repeat: no-repeat;
                }
                .player {
                    padding: 30px;
                    background: rgba(0,0,0,0.3);
                    text-align: center;
                }
                h3 {
                    margin: 0;
                }
                h6 {
                    margin: 0;
                    margin-top: 1em;
                }
                audio {
                    margin-top: 2em;
                    width: 100%;
                }
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 99999;
                }
            `}</style>
            <style jsx global>{`
            body {
                margin: 0;
                font-family: system-ui;
                background: white;
            }
            `}</style>
        </div>
    }
}