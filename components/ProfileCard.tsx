import Image from 'next/image';

const ProfileCard = () => {
  return (
    <div className="relative w-[280px] sm:w-[320px] lg:w-[340px] rounded-[28px] p-[1px] animated-border">
      <div className="glass rounded-[27px] overflow-hidden">
        <div className="relative aspect-[4/5] w-full bg-[#050510]">
          <Image
            src="/Profile.jpg"
            alt="Yuvraj Singh"
            fill
            priority
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
