import majorTom from "../../media/tom.png"
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
    <div className="small-material-div">
        <h2 className="material-title">מהו אסטרואיד?</h2>
        <p className="material-text">אסטרואיד הוא יצור מרושע שמטרתו להשמיד את כדור הארץ ואנחנו בברוגז איתו, ממש. הוא נראה כמו כדור עגול כזה אבל לא חלק כי יש לו בליטות ממש מכוערות שנראות כמו חצ'קונים.</p>
        
    </div>
    </>
    }
    </>
)
}

export default Material;