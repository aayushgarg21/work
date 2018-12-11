import React from "react";
import Typography from '@material-ui/core/Typography';
import scrollToComponent from 'react-scroll-to-component';



class Help extends React.Component {

    scroll(name) {
        // this.name.scrollIntoView({block: 'end', behavior: 'smooth'});
    }
    render() {
        return (
            <div className="box">
                <Typography className="help" variant="title" style={{ fontSize: 27 }}>Streamer Docs</Typography>
                <Typography className="help2" variant="title" onClick={() => scrollToComponent(this.About, { offset: 0, align: 'top', duration: 1500 })} style={{ fontSize: 27, cursor: "pointer" }}>About Streamer</Typography>
                <Typography className="help2" variant="title" onClick={() => scrollToComponent(this.Start, { offset: 0, align: 'top', duration: 1500 })} style={{ fontSize: 27, cursor: "pointer" }}>Getting Started</Typography>
                <Typography className="help2" variant="title" onClick={() => scrollToComponent(this.Component, { offset: 0, align: 'top', duration: 1500 })} style={{ fontSize: 27, cursor: "pointer" }}>Components </Typography>
                <Typography className="help2" variant="title" onClick={() => scrollToComponent(this.Library, { offset: 0, align: 'top', duration: 1500 })} style={{ fontSize: 27, cursor: "pointer" }}>Client Library</Typography>
                <p className="client_libaray" style={{ marginLeft: 60,marginTop : 80 }}>
                    The current stable version of client-library is
           <a id="npm-stable-version" href="https://www.npmjs.com/package/client-streamer" style={{ marginLeft: 10 }}>here</a>
                    . To install, run:
           <code style={{ marginLeft: 10 }}>npm install client-streamer</code>

                </p>

                <section style={{ height: 400 }} className='about' ref={(section) => { this.About = section; }}>
                
                 </section>

























                <section style={{ height: 400 }} className='start' ref={(section) => { this.Start = section; }}>Start</section>
                <section style={{ height: 400 }} className='components' ref={(section) => { this.Component = section; }}>Components</section>
                <section style={{ height: 400 }} className='library' ref={(section) => { this.Library = section; }}>
                    <Typography className="help2" variant="title" style={{ fontSize: 20, marginLeft : 60 }}>Client-Streamer</Typography>
                    <div className = "grid_parent_docs">
                        <div>
                    <Typography variant="title" style={{ fontSize: 15, marginLeft: 30 }}>Methods :</Typography>
                    <ul>
                        <li> configure(tokenvalue,callback,version)</li>
                        <li> subscribe(listenForEvent,callback)</li>
                        <li> push(eventType,activity,callback) </li>
                        <li> publishSpec(specFileData)   </li>
                        <li> on(listenForEvent,callback) </li>
                        <li> pushToQueue(activity)   </li>
                        <li> penQueue()     </li>
                        <li> startQueue(activity)  </li>
                        <li> addToQueue(activity)     </li>
                        <li> done()    </li>
                        <li> queueLength()    </li>
                        <li> downloadToken(applicationName, apiPath, version) </li>
                        <li> removeQueueJob(id)   </li>
                        <li> queueHas(id)    </li>
                        <li> abortQueue()  </li>
                    </ul>
                    </div >
                    <div>
                    <Typography variant="title" style={{ fontSize: 15}}>Versions :</Typography>
                     <ul>
                         <li style = {{padding : 10}}>
                         <a href="/package/client-streamer/v/1.0.4-alpha" class="versions__versions___2MpNL f5 black-60 lh-copy code link underline-hover" title="1.0.4-alpha">1.0.4-alpha</a>
                         </li>
                         <li style = {{padding : 10}}>
                         <a href="/package/client-streamer/v/1.0.3-alpha" class="versions__versions___2MpNL f5 black-60 lh-copy code link underline-hover" title="1.0.3-alpha">1.0.3-alpha</a></li>
                     </ul>
                    </div>
                    <div >
                    
                    <Typography variant="title" style={{ fontSize: 15, marginLeft: 30 }}>Dependencies :</Typography>
                    <ul>
                        <li style = {{padding : 10}}><Typography><a class="dependency__sectionWordCloud___1Ja0f f4 fw6 fl db pv1 ma1 black-70 link hover-black animate" href="/package/node-fetch">node-fetch</a></Typography></li>
                        <li style = {{padding : 10}}><Typography><a class="dependency__sectionWordCloud___1Ja0f f4 fw6 fl db pv1 ma1 black-70 link hover-black animate" href="/package/node-persistent-queue">node-persistent-queue</a></Typography></li>
                        <li style = {{padding : 10}}><Typography><a class="dependency__sectionWordCloud___1Ja0f f4 fw6 fl db pv1 ma1 black-70 link hover-black animate" href="/package/socket.io-client">socket.io-client</a></Typography></li>
                    </ul>
                    </div>
                    </div>

                </section>


            </div>
        );

    }
}
export default Help;