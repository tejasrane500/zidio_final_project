import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../App"
import { filterPaginationData } from "../common/filter-pagination-data";
import { useEffect } from "react";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import NoDataMessage from "../components/nodata.component";
import NotificationCard from "../components/notification-card.component";
import LoadMoreDataBtn from "../components/load-more.component";

const Notifications = () => {

    let { userAuth, setUserAuth } = useContext(UserContext);
    let access_token = userAuth?.access_token;
    let new_notification_availlable = userAuth?.new_notification_availlable;

    const [ filter, setFilter ] = useState('all');
    const [ notification, setnotification ] = useState(null);

    let filters = [ 'all', 'like', 'comment', 'reply' ];

    const fetchNotification = ({ page, deletedDocCount = 0 }) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/notification", { page, filter, deletedDocCount }, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(async ({ data: { notification: data } }) => {

            if(new_notification_availlable){
                setUserAuth({ ...userAuth, new_notification_availlable: false })
            }

            let formatedData = await filterPaginationData({
                state: notification,
                data, page,
                countRoute: "/all-notification-count",
                data_to_send: { filter },
                user: access_token
            })

            setnotification(formatedData)

        })
        .catch(err => {
            console.log(err);
        })

    }

    useEffect(() => {

        if(access_token){
            fetchNotification({ page: 1 })
        }

    }, [access_token, filter])

    const handleFilter = (e) => {

        let btn = e.target;

        setFilter(btn.innerHTML);

        setnotification(null);

    }

    return (
        <div>

            <h1 className="max-md:hidden">Recent Notification</h1>

            <div className="my-8 flex gap-6">
                {
                    filters.map((filterName, i) => {
                        return <button key={i} className={"py-2 " + (filter == filterName ? "btn-dark" : "btn-light")} onClick={handleFilter}>{filterName}</button>
                    })
                }
            </div>

            {
                notification == null ? <Loader /> :
                <>
                   
                   {
                      notification.results.length ?
                        notification.results.map((notification, i) => {
                            return <AnimationWrapper key={i} transition={{ delay: i*0.08 }}>
                                <NotificationCard data={notification} index={i} notificationState={{ notification, setnotification }} />
                            </AnimationWrapper>
                        })
                      : <NoDataMessage message="Nothing availlable" />  
                   }

                   <LoadMoreDataBtn state={notification} fetchDataFun={fetchNotification} additionalparam={{ deletedDocCount: notification.deletedDocCount }} />

                </>
            }

        </div>
    )
}

export default Notifications;