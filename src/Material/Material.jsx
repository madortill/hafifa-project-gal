import majorTom from "../../media/tom.png"
import cunningAsteroid from "../../media/Material/cunningasteroid.png"
import earth from "../../media/Material/earth.png"
import earthText from "../../media/Material/earthText.svg"
import asteroidText from "../../media/Material/asteroidText.svg"
import "./Material.css"

function Material({pageNum}){
return (
    <>
    {pageNum===3&& 
    <>
    <img src={majorTom} className="material-tom"/>
    <div className="small-material-div">
        <h2 className="material-title">פיצוץ אסטרואידים</h2>
        <p className="material-text">שיעור פיצוץ אסטרואיד ידוע בחשיבותו בגלל הסכנה היומיומית הנשקפת לכדור הארץ בלעדיו. עשרות אלפי אסטרואידים נעים ברגע זה לכיוון הכוכב שלנו, ועליכן לדעת כיצד למנוע מהם להגיע אליו.</p>
    </div>
    </>
    }

    {pageNum===4&& 
    <>
    <div className="large-material-div">
        <h2 className="material-title">מהו אסטרואיד?</h2>
        <p className="material-text">אסטרואיד הוא יצור מרושע שמטרתו להשמיד את כדור הארץ ואנחנו בברוגז איתו, ממש. הוא נראה כמו כדור עגול כזה אבל לא חלק כי יש לו בליטות ממש מכוערות שנראות כמו חצ'קונים.</p>
        <img className="earth" src={earth}/>
        <img className="cunningAsteroid" src={cunningAsteroid}/>
        <img className="earthText" src={earthText}/>
        <img className="asteroidText" src={asteroidText}/>
    </div>
    </>
    }
    </>
)
}

export default Material;