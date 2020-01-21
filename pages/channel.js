import 'isomorphic-fetch'
import Link from 'next/link'
import Error from 'next/error'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'

export default class extends React.Component{
    
    static async getInitialProps({query, res}){
        try{
            let idChannel = query.id

            let [reqChannel, reqSeries, reqAudios] = await Promise.all([
                fetch(`https://api.audioboom.com/channels/${idChannel}`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
            ])

            let dataChannel = await reqChannel.json()
            let channel = dataChannel.body.channel

            let dataSeries = await reqSeries.json()
            let series = dataSeries.body.channels

            let dataAudios = await reqAudios.json()
            let audioClips = dataAudios.body.audio_clips

            return { channel, audioClips, series, statuCode:200 }
        } catch(e){
            return { channel: null, audioClips: null, series:null, statuCode:503 }
        }
    }

    render(){
        const {channel, audioClips, series, statusCode} = this.props
        
        console.log(statusCode)

        // if(statusCode !== 200){
        //     return <Error statusCode={statusCode} />
        // }

        return <Layout title={channel.title}>
            <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

            <h1>{ channel.title }</h1>

            { series.length > 0 &&
                <div>
                    <h2>Series</h2>
                    <ChannelGrid channels={ series } />
                </div>
            }

            <style jsx>{`
                .banner {
                    width: 100%;
                    padding-bottom: 25%;
                    background-position: 50% 50%;
                    background-size: cover;
                    background-color: #aaa;
                }
                h1 {
                    font-weight: 600;
                    padding: 15px;
                }
                h2 {
                    padding: 15px;
                    font-size: 1.2em;
                    font-weight: 600;
                    margin: 0;
                }
            `}</style>

            <style jsx global>{`
                body {
                    margin: 0;
                    font-family: system-ui;
                    background: white;
                }
            `}</style>
        </Layout>
    }
}