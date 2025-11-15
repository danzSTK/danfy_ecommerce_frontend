"use client";
import TitleComponent from "@/components/titles/Title";

import { useAuth } from "@/hooks/useAuth";
import { IUser } from "@/interfaces/Auth.interface";
import { useGetAllAddressQuery } from "@/services/routes/Addres";
import UserAddressSection from "@/view/userProfile/userAddressSection";
import UserInformationSection from "@/view/userProfile/userInformation";

const mockUser: IUser = {
  id: 1,
  name: "Daniel Silva",
  email: "daniel.silva@example.com",
  phone: "+55 11 91234-5678",
  country: "BR",
  state: "SP",
  role: "user",
  status: "active",
  acceptedPrivacyAt: new Date(),
  acceptedTermsAt: new Date(),
  emailVerificationTokenExpiresAt: new Date(),
  isPhoneVerified: true,
  isEmailVerified: true,
  acceptsEmailMarketing: true,
  acceptsSmsMarketing: false,
  acceptsWhatsappMarketing: true,
  passwordHash: "$2b$10$abcdefg",
  acceptsPrivacy: true,
  acceptsTerms: true,
  currency: "BRL",
  emailVerificationToken: null,
  lastLoginAt: new Date(),
  locale: "pt-BR",
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function UserProfilePage() {
  const { user } = useAuth();
  const { data: address, isLoading, isError } = useGetAllAddressQuery();
  return (
    <section className="container space-y-6">
      <TitleComponent as="h3" className="mb-4 text-xl md:text-2xl">
        Minhas informações
      </TitleComponent>

      <UserInformationSection user={user ?? mockUser} />

      <UserAddressSection
        address={address ?? []}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  );
}
