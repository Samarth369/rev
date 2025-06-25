import "../style/dashboard.css";

export default function Dashboard () {

    function Space () {
        return (
            <>
            <div className="space-block">
                <div className="space">
                    
                    <div className="spacebtn">
                        <h1>Space</h1>
                        
                        <button>new Space</button>
                    </div>

                    <div className="spacespace">
                    </div>

                </div>
            </div>
            </>
        )
    }

    return (
        <>
        <div className="dsb-main">
            <Space />
        </div>
        </>
    )
}