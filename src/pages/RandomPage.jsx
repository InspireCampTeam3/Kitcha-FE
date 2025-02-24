import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import randomData from '@/constants/random/randomData';
import deco from '@/assets/webps/common/deco.webp';
import summary from '@/assets/svgs/common/summary.svg';
import heart from '@/assets/webps/random/heart.webp';
import bad from '@/assets/webps/random/bad.webp';

const RandomPage = () => {
  const nav = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [fade, setFade] = useState(false); // 말풍선 서서히 없어지게

  const { news_title, long_summary, interest } = randomData[0];

  // heart 클릭 핸들러
  const handleHeartClick = () => {
    setShowMessage(true);

    setTimeout(() => {
      console.log(`to do: ${interest} 담아서 /apps/interest_news 에 POST`);
      nav('/news');
    }, 2500);
  };

  // bad 클릭 핸들러
  const handleBadClick = () => {
    console.log('to do: /apps/random GET 재호출');
  };

  // to do: useEffect로 마운팅 시 /apps/random GET 호출

  // 말풍선 애니메이션
  useEffect(() => {
    if (showMessage) {
      setFade(false);
      const fadeTimer = setTimeout(() => setFade(true), 1500);
      const hideTimer = setTimeout(() => {
        setShowMessage(false);
        setFade(false);
      }, 2000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [showMessage]);

  return (
    <>
      <div className="px-[30px] flex flex-col items-center justify-center">
        <div className="justify-center z-10 pt-[85px] pb-[15px] px-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] cursor-pointer relative mt-[18px] w-full rounded-[16px] bg-linear-[90deg,#FFC7EE_0%,#FFD4EF_100%]">
          <p className="absolute tracking-normal text-[14px] text-[#6C6C6C] left-[18px] top-[14px]">
            랜덤하게 뉴스를 뽑아줘요
          </p>
          <img className="w-[94px] h-3 absolute right-[24px] top-[40px]" src={deco} alt="deco" />
          <p className="absolute text-[20px] font-[800] leading-[22px] text-[#464646] top-[52px] right-[22px]">
            RANDOM
          </p>
          <div className="bg-white pt-5 pb-4 px-4 rounded-[10px] shadow-[-2px_-2px_4px_0px_rgba(0,0,0,0.05),2px_2px_4px_0px_rgba(0,0,0,0.05)]">
            <h4 className="text-[#363636] text-[16px] tracking-normal font-bold leading-[24px] mb-3">
              {news_title}
            </h4>
            <div className="relative py-4 pl-8 pr-[18px] bg-white rounded-[10px] shadow-[-2px_-2px_4px_0px_rgba(0,0,0,0.05),2px_2px_4px_0px_rgba(0,0,0,0.05)]">
              <img
                className="absolute top-4 left-[10px] w-[16px] h-[16px]"
                src={summary}
                alt="summary"
              />
              <div className="text-[#363636] text-[12px] leading-[19px] tracking-normal">
                {long_summary}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-[30px] flex w-[152px] justify-between mx-auto">
            <div className="relative">
              <div
                onClick={handleHeartClick}
                className="cursor-pointer w-[60px] h-[60px] flex justify-center items-center bg-[#F35692] rounded-full"
              >
                <img className="w-[30px] h-[30px]" src={heart} alt="heart" />
              </div>
              {showMessage && (
                <div
                  className={`transition-opacity duration-500 ${
                    fade ? 'opacity-0' : 'opacity-100'
                  } absolute left-1/2 -translate-x-1/2 bottom-[-55px]`}
                >
                  <div className="z-10 relative top-[] bg-[#FFEEF9] rounded-[10px] w-[158px] h-[39px] flex justify-center items-center">
                    <div className="z-0 absolute top-[-10px] left-1/2 -translate-x-1/2 border-l-[19px] border-l-transparent border-r-[19px] border-r-transparent border-b-[32px] border-b-[#FFEEF9]" />
                    <span className="z-100 relative text-[14px] text-black tracking-normal">
                      MY PICK에 반영돼요!
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div
              onClick={handleBadClick}
              className="cursor-pointer w-[60px] h-[60px] flex justify-center items-center bg-[#9B9B9B] rounded-full"
            >
              <img className="w-[30px] h-[30px]" src={bad} alt="bad" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RandomPage;
