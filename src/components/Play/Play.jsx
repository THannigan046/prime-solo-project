import * as Tone from 'tone'

function Play() {

    const synth = new Tone.MembraneSynth().toDestination()

    const playSynth = () => {
        synth.triggerAttackRelease("C2", "8n")
    }
    
    return (
        <>


        <h1>Dammit bobby, play your dang synths</h1>
            <img src="https://art.ngfiles.com/images/1647000/1647974_thejudinator_synth-bobby.jpg?f1613569660"/>
            <button id='button' onClick={playSynth}>suffer</button>
        </>
    )
}
export default Play;