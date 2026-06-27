import "./Theme.css";
import heroImage from "../assets/gitcard.png";

function Theme() {
    return  (
        <section  className="theme">
             <div className="theme-left">
            <h1>Send Memories Through Time</h1>
            <p>Every Memory Deserves the perfect moment.</p>
            <button>Create Time Capsule</button>
           </div>
           <div className="theme-right">
            <img src={heroImage} alt="Gift card" />
           </div>
        </section>
        


    )
}
export default Theme;