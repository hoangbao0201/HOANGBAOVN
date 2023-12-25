import IconRank1 from "../../icons/IconRank1";
import IconRank2 from "../../icons/IconRank2";
import IconRank3 from "../../icons/IconRank3";

const SideRightHome = () => {

    return (
        <aside className="sticky top-[72px]">
            <div className="bg-white rounded-lg shadow-sm sticky top-[72px] mb-4">
                <div>
                    <div className="px-3 py-4 flex items-center text-lg font-semibold border-b">
                        <h2>Bảnh xếp hạng</h2>
                    </div>
                    <div>
                        {
                            [1,2,3,4,5].map((item,index) => {
                                return (
                                    <div key={index} className="px-3 py-2 border-b">
                                        <div className="flex items-center">
                                            <span className="w-8 mr-3 flex justify-center font-semibold">
                                                {
                                                    item == 1 ? (
                                                        <IconRank1 />
                                                    ) : (
                                                        item == 2 ? (
                                                            <IconRank2 />
                                                        ) : (
                                                            item == 3 ? (
                                                                <IconRank3 />
                                                            ) : (
                                                                item
                                                            )
                                                        )
                                                    )
                                                }
                                            </span>
                                            <h4 className="line-clamp-1">Nguyễn Thị Hiền Ngân</h4>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            
        </aside>
    )
}

export default SideRightHome;